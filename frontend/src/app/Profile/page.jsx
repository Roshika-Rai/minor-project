import Image from "next/image";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        {/* Profile Image */}
        <div className="flex justify-center">
          <Image
            src="/roshika.jpeg"   // 👈 public folder wali photo
            alt="Roshika"
            width={140}
            height={140}
            className="rounded-full border-4 border-purple-500 shadow-md"
          />
        </div>

        {/* Name & Email */}
        <h2 className="text-3xl font-bold mt-4 text-center text-gray-800">
          Roshika Rai
        </h2>
        <p className="text-center text-gray-500">roshika@example.com</p>

        {/* About Section */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-purple-600">About Me</h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
            I am a passionate Web Developer currently learning React.js and
            Next.js 🚀. I love creating modern, user-friendly websites and
            beautiful UI designs.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-purple-600 text-center">
            Skills
          </h3>
          <div className="flex justify-center gap-3 flex-wrap mt-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm shadow">
              HTML
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm shadow">
              CSS
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm shadow">
              JavaScript
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm shadow">
              React.js
            </span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm shadow">
              Next.js
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-purple-600">Contact</h3>
          <p className="text-gray-600 mt-2 text-sm">
            📍 Lucknow, India <br />
            📞 +91 9876543210 <br />
            ✉️ roshika@example.com
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-5 py-2 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition">
            Message
          </button>
          <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl shadow hover:bg-gray-300 transition">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}