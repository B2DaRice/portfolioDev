import { Metadata } from "next"
import Image from "next/image"

// import { Separator } from "@/registry/new-york/ui/separator"
import { SidebarNav } from "./sidebar-nav"

export const metadata: Metadata = {
  title: "Dashboard",
  description: ".",
}

const sidebarNavItems = [
  {
    title: "Property Information",
    href: "#propertyInformation",
  },
  {
    title: "Property Location",
    href: "#propertyLocation",
  },
  {
    title: "Property Specifics",
    href: "#propertySpecifics",
  },
  {
    title: "Cleaning Instructions",
    href: "#cleaningInstructions",
  },
  {
    title: "Terms & Agreements",
    href: "#terms",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Add Property</h2>
          <p className="text-muted-foreground">
            Add a new property.
          </p>
        </div>
        {/* <Separator className="my-6" /> */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}