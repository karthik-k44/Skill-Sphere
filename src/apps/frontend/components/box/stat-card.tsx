interface StatCardProps {
  label: string;
  value: string | number;
}
const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

export default StatCard
