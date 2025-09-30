import { GetStaticProps } from "next";
import Link from "next/link";
import client from "lib/sanity/client";
import MetaHead from "components/MetaHead";
import PageLayout from "components/PageLayout/PageLayout";

interface AboutProps {
  // Add any props you might need for the about page
}

const About: React.FC<AboutProps> = () => {
  return (
    <PageLayout>
      <MetaHead title="Tentang Kami - Furniture Business" description="Pelajari lebih lanjut tentang bisnis furniture kami, nilai-nilai, dan komitmen kami terhadap kualitas." />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tentang Kami</h1>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg mb-6 text-gray-600">
            Kami adalah perusahaan furnitur yang berkomitmen untuk menyediakan produk berkualitas tinggi dengan desain yang indah dan fungsional.
          </p>
          <p className="text-lg mb-6 text-gray-600">
            Dengan pengalaman bertahun-tahun dalam industri furnitur, kami memahami bahwa setiap potongan furnitur bukan hanya tentang fungsi, 
            tetapi juga tentang menciptakan suasana yang nyaman dan indah di rumah atau kantor Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Visi Kami</h3>
            <p className="text-gray-600">
              Menjadi penyedia furnitur terkemuka yang memberikan solusi interior yang indah, fungsional, dan terjangkau untuk semua.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Misi Kami</h3>
            <p className="text-gray-600">
              Membuat produk furnitur yang tahan lama dengan menggunakan bahan berkualitas dan desain yang inovatif.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Nilai Kami</h3>
            <p className="text-gray-600">
              Kualitas, kepercayaan, inovasi, dan layanan pelanggan yang luar biasa adalah nilai-nilai utama kami.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Kisah Kami</h3>
          <p className="text-gray-600 mb-4">
            Bermula dari bengkel kecil di pinggiran kota, kami telah berkembang menjadi salah satu merek furnitur terpercaya di Indonesia. 
            Setiap produk kami dibuat dengan penuh perhatian terhadap detail dan kualitas, memastikan bahwa pelanggan mendapatkan nilai terbaik.
          </p>
          <p className="text-gray-600">
            Kami percaya bahwa rumah bukan hanya tempat tinggal, tetapi juga cerminan dari siapa kita. 
            Oleh karena itu, kami berkomitmen untuk menciptakan furnitur yang tidak hanya fungsional tetapi juga mencerminkan gaya hidup dan kepribadian Anda.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60
  };
};

export default About;