export const LoadingComponent: React.FC<unknown> = () => {
  return (
    <section className="hero">
      <div className="loading-state">
        <span className="material-symbols-outlined spin">sync</span>
        <p>Loading about page...</p>
      </div>
    </section>
  );
};
