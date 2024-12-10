import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-fit">
      <UserProfile routing="hash" />
    </div>
  );
}
