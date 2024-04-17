const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Inv_Surat = {
  // MAHASISWA START
  getAllSurat: async () => {
    try {
      const surat = await prisma.log_Surat.findMany({
        select: {
          surat: {
            select: {
              nama_pengaju: true,
              nim_pengaju: true,
              prodi: {
                select: {
                  nama_prodi: true,
                },
              },
              jenis_surat: {
                select: {
                  nama_jenis_surat: true,
                },
              },
            },
          },
          status: {
            select: {
              nama_status: true,
            },
          },
          waktu: true,
        },
      });

      const transformedSurat = surat.map((surat) => {
        return {
          nama_pengaju: surat.surat.nama_pengaju,
          nim_pengaju: surat.surat.nim_pengaju,
          prodi_pengaju: surat.surat.prodi.nama_prodi,
          jenis_surat: surat.surat.jenis_surat.nama_jenis_surat,
          status: surat.status.nama_status,
          waktu: surat.waktu,
        };
      });

      return transformedSurat;
    } catch (error) {
      throw new Error("Failed to get all surat");
    }
  },

  getSpecifiedSurat: async (id_surat) => {
    try {
      const surat = await prisma.inv_Surat.findUnique({
        where: {
          id_surat: id_surat,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to get specified surat");
    }
  },
  // MAHASISWA END

  uploadSurat: async (no_surat, perihal, id_jenis_surat, id_user, id_bagian) => {
    try {
      const surat = await prisma.surat.create({
        data: {
          no_surat: no_surat,
          tgl_surat: new Date(),
          perihal: perihal,
          id_jenis_surat: id_jenis_surat,
          id_user: id_user,
          id_bagian: id_bagian,
          log_surat: {
            create: {
              id_user: id_user,
              id_bagian: id_bagian,
              waktu: new Date(),
              id_status: 1,
            },
          },
        },
        include: {
          log_surat: true,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to upload surat");
    }
  },

  updateSurat: async (id_surat, id_user, id_bagian, id_status) => {
    try {
      const surat = await prisma.surat.update({
        where: {
          id_surat: id_surat,
        },
        data: {
          log_surat: {
            create: {
              id_user: id_user,
              id_bagian: id_bagian,
              id_status: id_status,
              catatan: catatan ? catatan : null,
            },
          },
        },
        include: {
          log_surat: true,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to update surat");
    }
  },

  getSuratByUniqueId: async (unique_id) => {
    try {
      const surat = await prisma.surat.findUnique({
        where: {
          unique_id: unique_id,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to get surat by unique id");
    }
  },

  cancelSurat: async (id_surat, id_user) => {
    try {
      const surat = await prisma.surat.update({
        where: {
          id_surat: id_surat,
        },
        data: {
          log_surat: {
            create: {
              id_user: id_user,
              id_surat: id_surat,
              waktu: new Date(),
              catatan: catatan ? catatan : null,
              id_status: 5,
            },
          },
        },
        include: {
          log_surat: true,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to cancel surat");
    }
  },

  mhsSeeLogFromId: async (id_surat, unique_id) => {
    try {
      const suratDetails = await prisma.surat.findFirst({
        select: {
          id_surat: true,
          no_surat: true,
          Master_Jenis_Surat: { select: { nama_jenis_surat: true } },
          Log_Surat: {
            select: {
              Master_Status_Surat: { select: { nama_status: true } },
            },
            where: { id_surat: id_surat },
          },
        },
        where: {
          id_surat: id_surat,
          unique_id: unique_id,
        },
        include: {
          Master_Jenis_Surat: true,
          Log_Surat: true,
        },
      });
      return suratDetails;
    } catch (error) {
      // Handle error
      console.error("Error fetching surat details:", error);
      throw error;
    }
  },

  mhsSubmittedSurat: async (unique_id) => {
    try {
      const surat = await prisma.surat.findMany({
        select: {
          id_surat: true,
          no_surat: true,
          Master_Jenis_Surat: { select: { nama_jenis_surat: true } },
          Log_Surat: {
            select: {
              waktu: true,
              Master_Status_Surat: { select: { nama_status: true } },
            },
            orderBy: { waktu: "desc" },
            take: 1,
          },
        },
        where: { unique_id: unique_id },
        include: {
          Master_Jenis_Surat: true,
          Log_Surat: true,
        },
        orderBy: { "Log_Surat.waktu": "desc" },
        groupBy: { id_surat: true, no_surat: true, "Master_Jenis_Surat.nama_jenis_surat": true },
      });
      return surat;
    } catch (error) {
      // Handle error
      console.error("Error fetching surat details:", error.message);
      throw error;
    }
  },

  getSuratFromBagian: async (id_bagian) => {
    try {
      const surat = await prisma.surat.findMany({
        where: {
          id_bagian: id_bagian,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to get surat from bagian");
    }
  },

  signSurat: async (id_surat, id_user, id_bagian) => {
    try {
      const surat = await prisma.surat.update({
        where: {
          id_surat: id_surat,
        },
        data: {
          log_surat: {
            create: {
              id_user: id_user,
              id_bagian: id_bagian,
              waktu: new Date(),
              id_status: 3,
            },
          },
        },
        include: {
          log_surat: true,
        },
      });

      return surat;
    } catch (error) {
      throw new Error("Failed to sign surat");
    }
  },

  getSuratById: async (id_surat) => {
    try {
      const surat = await prisma.inv_Surat.findFirst({
        select: {
          no_surat: true,
          perihal: true,
          nama_pengaju: true,
          nim_pengaju: true,
          prodi: {
            select: {
              nama_prodi: true,
            },
          },
          log_surat: {
            select: {
              waktu: true,
              status: {
                select: {
                  nama_status: true,
                },
              },
            },
            orderBy: {
              waktu: "desc",
            },
          },
        },
        where: {
          id_surat: id_surat,
        },
      });

      const transformedSurat = {
        no_surat: surat.no_surat,
        perihal: surat.perihal,
        nama_pengaju: surat.nama_pengaju,
        nim_pengaju: surat.nim_pengaju,
        prodi: surat.prodi.nama_prodi,
        log_surat: surat.log_surat.map((log) => {
          const waktu = new Date(log.waktu);
          return {
            waktu: waktu.toDateString() + " " + waktu.toLocaleTimeString('id-ID'),
            status: log.status.nama_status,
          };
        }),
      }

      return transformedSurat;
    } catch (error) {
      throw new Error("Failed to get surat by id");
    }
  },
};

module.exports = Inv_Surat;
