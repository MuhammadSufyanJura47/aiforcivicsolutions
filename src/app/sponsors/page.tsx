import PublicPage from "@/components/layout/public-page";
import PageIntro from "@/components/layout/page-intro";
import GlassCard from "@/components/ui/glass-card";
import InquiryForm from "@/components/forms/inquiry-forms";
import { sponsorTiers } from "@/lib/site";
import { sponsors } from "@/data/sponsordata";

export default function SponsorsPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Partnership opportunities"
        title="Support the Next Generation of Civic Innovators"
        description="Connect your organization with an initiative exploring AI, software development, and solutions for community challenges."
      />

      {/* Sponsors cards section (below the hero). Add sponsor objects in src/data/sponsordata.ts and place images under /public */}
      <section className="page-sponsors">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>Our Sponsors</h2>

          <div className="page-grid">
            {sponsors.map((sponsor) => (
              <GlassCard className="page-card" key={sponsor.name}>
                {sponsor.image && (
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    style={{
                      maxWidth: "100%",
                      height: 80,
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto 12px",
                    }}
                  />
                )}

                <h4 style={{ textAlign: "center", marginBottom: 6 }}>{sponsor.name}</h4>
                {sponsor.type && <p style={{ textAlign: "center" }}>{sponsor.type}</p>}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="page-grid">
            {sponsorTiers.map((tier) => (
              <GlassCard className="page-card" key={tier.tier}>
                <span className="tier-label">{tier.tier}</span>
                <h3>{tier.title}</h3>
                <p>{tier.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="page-callout" style={{ marginBottom: 38 }}>
            <h3>Potential ways to contribute</h3>
            <p>
              Organizations may propose financial support, learning
              resources, software credits, mentorship, equipment,
              internships, or other relevant contributions. Each proposal
              is subject to review and agreement; submitting an inquiry
              does not guarantee partnership.
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
