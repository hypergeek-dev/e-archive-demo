import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-black items-center justify-center px-4 text-center">
      <div className="w-full max-w-xl mb-6 px-4 bg-black rounded-md shadow-md">
        <Image
          src="/assets/background.webp"
          alt="Database illustration"
          width={800} 
          height={400} 
          className="mx-auto max-h-64 w-auto object-contain rounded-md"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">
        E-archive Demo Webapp
      </h1>
      <p className="text-lg max-w-xl text-gray-600 mb-8">
        This is a 3-page portfolio project simulating a digital archive workflow, including XML transformation, basic metadata editing (CRUD), and OAIS model alignment
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/transform"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow"
        >
          ➡️ Transform XML to JSON
        </a>
        <a
          href="/crud"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow"
        >
          🗂️ CRUD
        </a>
        <a
          href="/oais"
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded shadow"
        >
          📚 OAIS Model
        </a>
      </div>
    </main>
  );
}
