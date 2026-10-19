import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Handshake,
  Medal,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { prisma } from "@/lib/prisma";

const icons = [Medal, Handshake, Building2, Users];

function getSponsorLogoPath(organization: string) {
  const slug = organization
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/images/sponsors/${slug}.png`;
}

export default async function SponsorsSection() {
  const sponsors = await prisma.sponsorApplication.findMany({
    where: {
      status: "APPROVED",
      isPublished: true,
    },
    select: {
      organization: true,
      preferredTier: true,
    },
    orderBy: {
      organization: "asc",
    },
  });

  return (
    <section className="section surface-blue" id="sponsors">
      <div className="container">
        <SectionHeading
          eyebrow="Partner with purpose"
          title="Help Make Civic Innovation Possible"
          description="We welcome organizations interested in supporting civic technology, practical learning, and emerging innovators."
        />

        <div className="sponsors-grid">
          {sponsors.length === 0 ? (
            <GlassCard className="sponsor-card">
              <p className="sponsor-tier-label">COMING SOON</p>
              <h3>No sponsors announced yet</h3>
              <p>Our approved partners will appear here once published.</p>
            </GlassCard>
          ) : (
            sponsors.map((sponsor, index) => {
              const Icon = icons[index % icons.length];
              const imagePath = getSponsorLogoPath(sponsor.organization);

              return (
                <GlassCard key={sponsor.organization} className="sponsor-card">
                  <span className="icon-tile">
                    <Icon size={25} />
                  </span>

                  <p className="sponsor-tier-label">
                    {sponsor.preferredTier.toUpperCase()}
                  </p>

                  <h3>{sponsor.organization}</h3>

                  <img
                    src={imagePath}
                    alt={`${sponsor.organization} sponsor logo`}
                    style={{
                      maxHeight: 60,
                      width: "100%",
                      objectFit: "contain",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />

                  <Link href="/sponsors" className="card-link">
                    Partnership details <ArrowRight size={16} />
                  </Link>
                </GlassCard>
              );
            })
          )}
        </div>

        <p className="sponsor-note">
          Sponsorship opportunities are subject to review and confirmation.
        </p>

        <div className="section-action">
          <Link href="/sponsors" className="btn btn-primary">
            Become a Partner <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
