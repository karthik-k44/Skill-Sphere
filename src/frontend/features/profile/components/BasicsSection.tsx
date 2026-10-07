import { ProfileField } from "./ProfileField";

const SectionTitle = ({ title, description }: { title: string; description: string }) => (
  <div className="sm:col-span-2">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export const BasicsSection = () => (
  <div className="space-y-8">
    <section className="grid gap-4 sm:grid-cols-2">
      <SectionTitle title="About you" description="How you introduce yourself to recruiters and the AI tools." />
      <ProfileField
        name="headline"
        label="Headline"
        placeholder="Frontend engineer building accessible React products"
        maxLength={140}
        className="sm:col-span-2"
      />
      <ProfileField
        name="targetRole"
        label="Target role"
        placeholder="Full Stack Developer"
        hint="The analyzer and roadmap tailor advice to this role."
      />
      <ProfileField name="phoneNumber" label="Phone" type="tel" placeholder="+91 98765 43210" optional />
      <ProfileField
        name="summary"
        label="Professional summary"
        placeholder="Two or three sentences about what you do, what you're good at, and what you want next."
        multiline
        maxLength={1500}
        optional
        className="sm:col-span-2"
      />
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      <div className="sm:col-span-3">
        <h2 className="text-lg font-semibold">Location</h2>
        <p className="text-sm text-muted-foreground">Only your city, state and country appear on your public profile.</p>
      </div>
      <ProfileField name="address.city" label="City" placeholder="Bengaluru" optional />
      <ProfileField name="address.state" label="State" placeholder="Karnataka" optional />
      <ProfileField name="address.country" label="Country" placeholder="India" optional />
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      <div className="sm:col-span-3">
        <h2 className="text-lg font-semibold">Links</h2>
        <p className="text-sm text-muted-foreground">Recruiters click these first. Add at least one.</p>
      </div>
      <ProfileField name="links.github" label="GitHub" type="url" placeholder="https://github.com/you" optional />
      <ProfileField name="links.linkedin" label="LinkedIn" type="url" placeholder="https://linkedin.com/in/you" optional />
      <ProfileField name="links.website" label="Website" type="url" placeholder="https://you.dev" optional />
    </section>
  </div>
);
