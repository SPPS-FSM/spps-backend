const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();
const { Prisma } = require("@prisma/client");

const LogSurat = {
  getAllLog: async (nama_pengaju, id_jenis_surat) => {
    try {
      const surat = await prisma.$queryRaw(Prisma.sql`
            SELECT Inv_Surat.id_surat, 
                Inv_Surat.nama_pengaju,
                Inv_Surat.nim_pengaju,
                Prodi.nama_prodi,
                Master_Jenis_Surat.nama_jenis_surat, 
                MAX(Master_Status_Surat.nama_status) as status, 
                MAX(Log_Surat.waktu) as waktu
            FROM Log_Surat
            LEFT JOIN Inv_Surat ON Inv_Surat.id_surat = Log_Surat.id_surat
            LEFT JOIN Master_Status_Surat ON Log_Surat.id_status = Master_Status_Surat.id_status
            LEFT JOIN Master_Jenis_Surat ON Inv_Surat.id_jenis_surat = Master_Jenis_Surat.id_jenis_surat
            LEFT JOIN Prodi ON Inv_Surat.prodi_pengaju = Prodi.id_prodi
            WHERE 
            (Inv_Surat.nama_pengaju LIKE CONCAT('%', ${nama_pengaju}, '%') OR Inv_Surat.nama_pengaju IS NULL) 
            AND
            (Inv_Surat.id_jenis_surat IS NULL OR Inv_Surat.id_jenis_surat = ${id_jenis_surat} OR ${id_jenis_surat} IS NULL)
            GROUP BY Inv_Surat.id_surat
            ORDER BY MAX(Log_Surat.waktu) DESC;
            `);

      return surat;
    } catch (error) {
      throw new Error("Failed to get all surat", error.message);
    }
  },

  getSpecifiedLog: async (id_log_surat) => {
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
          id_log_surat: true,
        },
        where: {
          id_log_surat: id_log_surat,
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
      // throw new Error("Failed to get all surat", error.message);
      console.error(error.message);
    }
  },

  getLogFromSpecifiedSurat: async (id_surat) => {
    try {
      const result = await prisma.log_Surat.findMany({
        where: {
          id_surat: id_surat,
        },
      });

      return result;
    } catch (error) {
      throw new Error("Failed to get log from specified surat");
    }
  },
};

module.exports = LogSurat;
