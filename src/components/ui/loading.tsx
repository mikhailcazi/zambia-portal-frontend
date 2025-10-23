export default function Loading({ className }: { className?: string }) {
  return (
    <div className={"flex justify-center p-10 " + className}>
      <span className="loader" />
    </div>
  );
}
