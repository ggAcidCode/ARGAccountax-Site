

export default function ReferPage() {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSenNGhi0vB-HcpUgo4ltYD4iOXXZ3mVzvbE1c5VBVl_vJ5jCA/viewform?usp=publish-editor";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900 text-white px-6 py-16 md:py-24 text-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-60%] left-[-20%] w-[140%] h-[200%] pointer-events-none" 
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(74, 222, 128, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(21, 128, 61, 0.15) 0%, transparent 50%)' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-block border border-[#4ade80]/30 bg-[#4ade80]/15 text-[#4ade80] text-xs font-bold tracking-[2.5px] uppercase px-5 py-2 rounded-full mb-7">
            Referral Rewards Program
          </div>
          <h1 className="text-4xl md:text-6xl font-heading mb-5 leading-tight text-white">
            Share the Love.<br/>
            Refer a Friend, <span className="text-[#4ade80]">Get Rewarded.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
            You trust us with your taxes — your friends will too. Refer someone and earn 15% off your tax prep when they file with us.
          </p>
          <div className="inline-block bg-[#15803d]/40 text-emerald-100 px-4 py-2 rounded-lg text-sm mb-8 border border-[#15803d]/60">
            ⏳ Valid from Apr 13, 2026 to May 31, 2026
          </div>
          <div>
            <a 
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#15803d]/20"
            >
              <span>Submit Referral Form</span>
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#15803d] mb-3">
          How It Works
        </div>
        <h2 className="text-3xl md:text-4xl font-heading text-slate-900 mb-10">
          Three simple steps
        </h2>
        
        <div className="space-y-0 relative">
          {/* Step 1 */}
          <div className="flex gap-5 py-7 border-b border-slate-200">
            <div className="w-14 h-14 shrink-0 bg-[#15803d] text-white font-heading text-2xl flex items-center justify-center rounded-xl">1</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Submit Your Referral</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Click the link below to fill out our quick referral form with your details and your friend's info. We'll handle the rest.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex gap-5 py-7 border-b border-slate-200">
            <div className="w-14 h-14 shrink-0 bg-[#15803d] text-white font-heading text-2xl flex items-center justify-center rounded-xl">2</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Your Friend Files With Us</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We'll reach out to your friend with a personalized invitation. When they complete their tax filing with us, the reward unlocks.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex gap-5 py-7 border-b border-slate-200">
            <div className="w-14 h-14 shrink-0 bg-[#15803d] text-white font-heading text-2xl flex items-center justify-center rounded-xl">3</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">You Get Rewarded</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Once their return is filed and paid, you receive 15% off your next invoice — or if you've already filed this year, we'll send your reward directly via Interac e-Transfer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REWARDS TIER CARDS */}
      <section className="px-6 py-16 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#4ade80] mb-3">
            Your Reward
          </div>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-10">
            You refer, you get rewarded
          </h2>
          
          <div className="max-w-md mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-[#15803d]/20 border border-[#15803d] p-8 transition-transform hover:-translate-y-1">
              <div className="absolute top-4 -right-7 bg-[#4ade80] text-slate-900 text-[9px] font-bold tracking-[1.5px] py-1 px-9 rotate-45">
                MOST POPULAR
              </div>
              <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#4ade80] mb-4">
                Personal Tax Return
              </div>
              <div className="font-heading text-5xl text-[#4ade80] mb-1">
                15% <span className="text-base text-white/50 tracking-normal">off</span>
              </div>
              <div className="text-sm text-white/50 mb-6">
                Your reward for every successful referral
              </div>
              <ul className="space-y-0.5">
                {[
                  "15% off your next tax prep fee for each friend who files with us",
                  "Already filed this year? We'll send your reward via Interac e-Transfer",
                  "Reward unlocked once your friend's return is filed & paid",
                  "No limit on referrals — refer 5 friends, earn 5 rewards"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-2 text-sm text-white/75 border-t border-white/5">
                    <span className="text-[#4ade80] font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TERMS */}
      <section className="px-6 py-16 md:py-24 max-w-2xl mx-auto">
        <div className="bg-[#f0fdf4] rounded-2xl p-7 border-l-4 border-[#15803d]">
          <h3 className="text-sm font-bold text-[#15803d] mb-3">Program Terms</h3>
          <ul className="space-y-2">
            {[
              "The 15% reward applies to the referrer only and is earned once the referred client's return is filed and payment is received in full.",
              "If the referrer has not yet filed for the current tax year, the reward is applied as a credit toward their upcoming tax filing invoice.",
              "If the referrer has already filed and paid for the current tax year, the reward amount (15% of their filing fee) will be sent via Interac e-Transfer to the email on file.",
              "Referral rewards cannot be combined with other promotional offers.",
              "There is no limit to the number of friends you can refer — each qualifying referral earns a separate reward.",
              "This program is valid between Apr 13, 2026 to May 31, 2026.",
              "Self-referrals or referring existing clients do not qualify."
            ].map((term, i) => (
              <li key={i} className="text-[13px] text-slate-600 leading-relaxed relative pl-4">
                <span className="absolute left-0 text-[#15803d] font-bold">·</span>
                {term}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
