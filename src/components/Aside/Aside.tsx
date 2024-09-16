import {
  CircleUser,
  Clock,
  FacebookIcon,
  Globe,
  Hash,
  LinkedinIcon,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Users,
} from "lucide-react";
import { Card } from "../ui/card";

export default function Aside() {
  return (
    <aside className="relative max-w-[225px]">
      <div className="relative -top-[14px] flex flex-col gap-4">
        <Card className="bg-white text-sm p-6">
          <a href="tel:07911654321" className="flex gap-2">
            <Phone className="size-4" /> 07911 654321
          </a>
          <a href="mailto:avd.yana@videorollnet" className="flex my-2 gap-2">
            <Mail className="size-4" />
            avd.yana@videorollnet
          </a>
          <div className="flex gap-[14px]">
            <LinkedinIcon className="size-4" />
            <FacebookIcon className="size-4" />
            <Twitter className="size-4" />
          </div>
        </Card>
        <Card className="bg-white text-sm p-6">
          <div className="mb-4">Hire Date</div>
          <div>
            <div className="mb-2">Sep. 3,2020</div>
            <div>3y - 9m - 20d</div>
          </div>
        </Card>
        <Card className="bg-white text-sm p-6 flex flex-col gap-2">
          <div className="flex gap-2">
            <Hash className="size-4" /> 5
          </div>
          <div className="flex gap-2">
            <Clock className="size-4" /> Full-Time
          </div>
          <div className="flex gap-2">
            <Users className="size-4" /> Operations
          </div>
          <div className="flex gap-2">
            <Globe className="size-4" /> Europe
          </div>
          <div className="flex gap-2">
            <MapPin className="size-4" /> London, UK
          </div>
        </Card>
        <Card className="bg-white text-sm p-6">
          <div className="mb-4">Direct Reports</div>
          <div className="flex flex-col gap-2">
            {["Shane", "Nathan", "Mitchell", "Philip"].map((user) => (
              <div key={user} className="flex gap-2">
                <CircleUser className="size-4" />
                {user}
              </div>
            ))}
            <div className="flex gap-2">
              <Users className="size-4" /> 4 more ...
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}
