import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome To Contact Manager</h1>
      <p className="text-xl text-gray-600">Manage Your contacts easily and efficiently</p>
      <div />
      <Image
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
        alt="Contact Manager"
        width={600}
        height={400}
        className="mt-8 rounded-lg shadow-lg"
      />
      <div className="mt-8 text-center">
        <p className="text-xl text-gray-600">Start managing your contacts today! </p>
      </div>
    </div>
  );
}
