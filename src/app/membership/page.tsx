import PlanCard from "@/components/plan/plan-card";

export default function MembershipPage() {
  return (
    <div>
      <h1 className="mb-4 mt-10 text-center text-xl font-bold">
        Upgrade with monthly membership
      </h1>

      <div className="flex flex-wrap justify-center">
        <PlanCard />
      </div>
    </div>
  );
}
