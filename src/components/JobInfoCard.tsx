type JobInfoCardProps = {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
};

function JobInfoCard({ label, value, Icon: IconComponent }: JobInfoCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <IconComponent className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

export default JobInfoCard;
