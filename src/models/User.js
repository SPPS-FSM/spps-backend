const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const User = {
  // ADMIN START
  getAll: async () => {
    try {
      const users = await prisma.user.findMany({
        select: {
          nama: true,
          email: true,
          status: true,
          role: {
            select: {
              nama_role: true,
            },
          },
          prodi: {
            select: {
              nama_prodi: true,
            },
          },
        },
      });

      const transformedUsers = users.map((user) => {
        return {
          ...user,
          role: user.role ? user.role.nama_role : null,
          prodi: user.prodi ? user.prodi.nama_prodi : null,
        };
      });

      return transformedUsers;
    } catch (err) {
      throw new Error("Failed to get all users");
    }
  },

  getUserByRole: async (id_role) => {
    try {
      const users = await prisma.user.findUnique({
        where: {
          id_role: id_role,
        },
      });

      return users;
    } catch (err) {
      throw new Error("Failed to get users by role");
    }
  },

  getUserByUniqueId: async (unique_id) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          unique_id: unique_id,
        },
      });

      return user;
    } catch (err) {
      throw new Error("Failed to get user by unique id");
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (error) {
      throw new Error("Failed to get user by email");
    }
  },

  createUser: async (unique_id, nama, password, email, id_role, id_prodi, id_bagian) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          unique_id: unique_id,
          nama: nama,
          password: hashedPassword,
          email: email,
          id_role: id_role,
          id_prodi: id_prodi,
          id_bagian: id_bagian,
        },
      });

      return user;
    } catch (err) {
      throw new Error("Failed to create user");
    }
  },

  deleteUser: async () => {
    try {
      const user = await prisma.user.delete({
        where: {
          unique_id: unique_id,
        },
      });

      return user;
    } catch (err) {
      throw new Error("Failed to delete selected user");
    }
  },

  deactiveUser: async (unique_id) => {
    try {
      const user = await prisma.user.update({
        where: {
          unique_id: unique_id,
        },
        data: {
          status: "Tidak Aktif",
        },
      });

      return user;
    } catch (error) {
      throw new Error("Failed to deactive user");
    }
  },
  // ADMIN END
};

module.exports = User;
