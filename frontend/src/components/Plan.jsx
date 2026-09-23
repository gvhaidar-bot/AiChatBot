import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <>
      <section className="py-24 relative px-6 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Tentukan RencanaMu</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10">Tentukan Jalan Yang Kamu Bangun</p>
          </div>
          <div className="" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
            <PricingTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Plan;
