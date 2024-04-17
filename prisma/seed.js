const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")

async function seeder() {
  try {
    const role = await prisma.role.createMany({
      data: [
        { nama_role: "Admin" },
        { nama_role: "Dekan" },
        { nama_role: "Wakil Dekan" },
        { nama_role: "Kepala Sub-Bagian" },
        { nama_role: "Petugas Peralatan" },
        { nama_role: "Operator Sub Bagian" },
        { nama_role: "Operator Penomoran Surat" },
        { nama_role: "Manager TU" }
      ],
    });

    const departemen = await prisma.departemen.createMany({
      data: [
        { id_departemen: "24010", nama_departemen: "Biologi" },
        { id_departemen: "24020", nama_departemen: "Fisika" },
        { id_departemen: "24030", nama_departemen: "Kimia" },
        { id_departemen: "24040", nama_departemen: "Matematika" },
        { id_departemen: "24060", nama_departemen: "Informatika" },
        { id_departemen: "24050", nama_departemen: "Statistika" },
      ],
    });

    const prodi = await prisma.prodi.createMany({
      data: [
        { id_prodi: "60", nama_prodi: "Informatika", id_departemen: "24060" },
      ]
    })

    const status_surat = await prisma.master_Status_Surat.createMany({
      data: [
        // { nama_status: "Diajukan" },
        // { nama_status: "Berada di Operator Sub Bagian"},
        // { nama_status: "Berada di Kepala Sub Bagian" },
        // { nama_status: "Menunggu tanda tangan Wakil Dekan 1"},
        // { nama_status: "Berada di Operator Sumber Daya"},
        // { nama_status: "Berada di di Kepala Sub Bagian Sumber Daya"},
        // { nama_status: "Menunggu tanda tangan  Wakil Dekan 2"},
        // { nama_status: "Menunggu tanda tangan Dekan"},
        // { nama_status: "Menunggu tanda tangan Kepala Departemen" },
        // { nama_status: "Menunggu tanda tangan Kepala Program Studi" },
        // { nama_status: "Menunggu tanda tangan Dosen Wali" },
        // { nama_status: "Menunggu tanda tangan Koordinator PKL/Skripsi/Penelitian" },
        // { nama_status: "Menunggu tanda tangan Petugas Peralatan" },
        // { nama_status: "Ditolak" }, 
        // { nama_status: "Selesai" }, 
        // { nama_status: "Dibatalkan" }
        { nama_status: "Diajukan", kode_status: "AK001", group_status: "Akademik", urutan: 1 },
        { nama_status: "Sedang diverifikasi oleh Operator Sub Bagian", kode_status: "AK002", group_status: "Akademik", urutan: 2 },
        { nama_status: "Berada di Kepala Sub Bagian", kode_status: "AK003", group_status: "Akademik", urutan: 3 },
        { nama_status: "Menunggu tanda tangan Wakil Dekan 1", kode_status: "AK004", group_status: "Akademik", urutan: 4 },
        { nama_status: "Diajukan", kode_status: "SD001", group_status: "Sumber Daya", urutan: 1},
        { nama_status: "Sedang diverifikasi oleh Operator Sumber Daya", kode_status: "SD002", group_status: "Sumber Daya", urutan: 2 },
        { nama_status: "Berada di Kepala Sub Bagian Sumber Daya", kode_status: "SD003", group_status: "Sumber Daya", urutan: 3 },
        { nama_status: "Menunggu tanda tangan Wakil Dekan 2", kode_status: "SD004", group_status: "Sumber Daya", urutan: 4 },
        { nama_status: "Menunggu tanda tangan Dekan", kode_status: "DK001" },
        { nama_status: "Dibatalkan", kode_status: "ST001" },
        { nama_status: "Ditolak", kode_status: "ST002" },
        { nama_status: "Selesai", kode_status: "ST003" },
      ],
    });

    const bagian = await prisma.bagian.createMany({
      data: [{ nama_bagian: "Akademik" }, { nama_bagian: "Sumber Daya" }],
    });

    // const hashedPassword = await bcrypt.hash("test", 10);

    // const user = await prisma.user.create({
    //   data: {
    //     "unique_id": "24060120140150",
    //     "nama": "Luthfi Arya",
    //     "password": hashedPassword,
    //     "email": "luthfi@email.com",
    //     "id_role": 2,
    //     "id_prodi": "60",
    //     "status": "Aktif"
    //   }
    // })

    const masterJenisSurat = await prisma.master_Jenis_Surat.create({
      data: {
        "nama_jenis_surat": "Surat Aktif Mahasiswa",
        // "filename": "filename",
        "id_bagian": 1,
        "code": "AKMHS"
      }
    })

    console.log("Seeding success: ", role);
    console.log("Seeding success: ", departemen);
    console.log("Seeding success: ", status_surat);
    console.log("Seeding success: ", bagian);
    console.log("Seeding success: ", prodi);
    console.log("Seeding success: ", user);
    console.log("Seeding success: ", masterJenisSurat);
  } catch (error) {
    console.error("Seeding failed: ", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seeder();
