import {
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import type { FC } from "react";
import type { UserAddress } from "../../../types/user-profile";

interface UserHeadProps {
  email: string;
  phone: string;
  name: string;
  role: string;
  address: UserAddress;
}

const UserHead: FC<UserHeadProps> = ({ email, phone, name, role, address }) => {
  const userName = (name?.trim() || "Skill Sphere User")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const userRole = role?.trim() || "Profile Owner";
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "SS";

  const location = [address?.city, address?.state, address?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary via-primary-900 to-primary-900 shadow-[0_30px_90px_-44px_rgba(37,99,235,0.45)]">
      <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-primary-50">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Profile Identity
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {userName}
            </h1>
            <p className="text-lg capitalize text-primary-100 sm:text-xl">
              {userRole}
            </p>
            <p className="max-w-2xl text-sm leading-7 text-primary-100 sm:text-base">
              A sharper introduction to your dashboard profile with your role,
              contact details, and location all presented in one strong header.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-primary-50 backdrop-blur">
              <Mail className="h-4 w-4 text-primary-200" />
              {email}
            </span>

            {phone && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-primary-50 backdrop-blur">
                <Phone className="h-4 w-4 text-primary-200" />
                {phone}
              </span>
            )}

            {location && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-primary-50 backdrop-blur">
                <MapPin className="h-4 w-4 text-primary-200" />
                {location}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary-100">
                  Identity Card
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {initials}
                </h2>
              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/20 bg-white/15 text-2xl font-bold text-white shadow-inner">
                {initials}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span className="text-sm text-primary-50">Profile owner</span>
                <BadgeCheck className="h-4 w-4 text-primary-200" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span className="text-sm text-primary-50">Email linked</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <span className="text-sm text-primary-50">
                  Contact visibility
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                  {phone ? "Ready" : "Partial"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserHead;
