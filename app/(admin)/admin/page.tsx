export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-zinc-400 mb-8">Gestion des cours, modules et leçons</p>

      {/* On ajoutera le CourseSelector ici */}
      <div className="bg-[#161820] border border-zinc-800/60 rounded-lg p-6">
        <p className="text-zinc-500">Sélecteur de cours à venir...</p>
      </div>
    </div>
  );
}
