import PlanCard from "@/components/plan/plan-card";

export default function MembershipPage() {
  return (
    <div>
      <h1 className="mb-4 mt-10 text-center text-xl font-bold">
        Upgrade with monthly membership
      </h1>

      <div className="flex flex-wrap justify-center">
        <PlanCard
          name="Monthly"
          image="/monthly-plan.png"
          headingText="Unlimited AI generated content forever for just $9.99/month"
        >
          <ul className="m-5">
            <li>✨ Unlimited word generation</li>
            <li>🧠 Advanced AI features</li>
            <li>⚡ Faster processing times</li>
            <li>🛠️ Priority customer support</li>
          </ul>
        </PlanCard>
        <PlanCard
          name="Free"
          image="/free-plan.png"
          headingText="Limited AI generated content forever free"
        >
          <ul className="m-5">
            <li>Limited word generation</li>
            <li>Basic AI features</li>
            <li>Normal processing times</li>
            <li>NO Priority customer support</li>
          </ul>
        </PlanCard>
      </div>
    </div>
  );
}
