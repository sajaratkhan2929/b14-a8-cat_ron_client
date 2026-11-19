import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = { title: "BookNook | My Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="My Profile" subtitle="Your details on BookNook." />
      <PrivateRoute>
        <ProfileCard />
      </PrivateRoute>
    </>
  );
}