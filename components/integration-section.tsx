import Image from "next/image"
import { Button } from "@/components/ui/button"

export function IntegrationSection() {
  const integrations = Array(15)
    .fill(null)
    .map((_, i) => ({
      name: `Integration ${i + 1}`,
      icon: `/placeholder.svg?height=48&width=48`,
    }))

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-6">
          {integrations.map((integration, index) => (
            <Image
              key={index}
              src={integration.icon || "/placeholder.png"}
              alt={integration.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
          ))}
        </div>
        <div className="mt-12 flex gap-4 justify-center">
        </div>
      </div>
    </section>
  )
}

