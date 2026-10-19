import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import InquiryForm from "@/components/forms/inquiry-forms";
import { prisma } from "@/lib/prisma";

function getSponsorLogoPath(organization: string) {
  const slug = organization
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `/images/sponsors/${slug}.png`;
}

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsorApplication.findMany({
    where: {
      status: "APPROVED",
      isPublished: true,
    },
    select: {
      organization: true,
      preferredTier: true,
    },
    orderBy: { organization: "asc" },
  });

  return (
    <PublicPage>
      <PageIntro
        eyebrow="Partnership opportunities"
        title="Support the Next Generation of Civic Innovators"
        description="Connect your organization with an initiative exploring AI, software development, and solutions for community challenges."
      />

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {sponsors.length === 0 ? (
              <GlassCard className="page-card">
                <h3>No sponsors announced yet</h3>
                <p>We will publish approved partners here once confirmed.</p>
              </GlassCard>
            ) : (
              sponsors.map((s) => (
                <GlassCard className="page-card" key={s.organization}>
                  <span className="tier-label">{s.preferredTier}</span>
                  <h3>{s.organization}</h3>

                  <img
                    src={getSponsorLogoPath(s.organization)}
                    alt={`${s.organization} logo`}
                    style={{ maxWidth: 200, marginTop: 8 }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </GlassCard>
              ))
            )}
          </div>

          <div className="page-callout" style={{ marginBottom: 38 }}>
            <h3>Potential ways to contribute</h3>
            <p>
              Organizations may propose financial support, learning resources, software credits, mentorship,
              equipment, internships, or other relevant contributions. Each proposal is subject to review and agreement;
              submitting an inquiry does not guarantee partnership.
            </p>
          </div>

          <div style={{ maxWidth: 850, marginInline: "auto" }}>
            <InquiryForm kind="sponsor" />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
