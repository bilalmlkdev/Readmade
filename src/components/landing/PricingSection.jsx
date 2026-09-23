import { Link } from "react-router-dom";
import { PLANS } from "../../data/plans.js";

export default function PricingSection() {
  return (
    <section className="pb-34 pt-14 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="landing-container">
        <div className="text-center mb-16">
          <div className="mb-3 section-label">Pricing</div>
          <h3 className="m-0 mb-4 mx-auto max-w-lg section-heading">
            Simple, transparent pricing.
          </h3>
          <p className="m-0 mx-auto max-w-md section-body">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-4xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlighted
                  ? "bg-black text-white scale-[1.02] shadow-2xl shadow-black/10"
                  : plan.active
                    ? "bg-white border border-gray-200 dark:border-white/10"
                    : "bg-white border border-gray-100 dark:border-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] font-semibold uppercase tracking-wider">
                  Popular
                </div>
              )}

              <div className="p-8 pb-6">
                <h4 className={`m-0 text-[13px] font-semibold uppercase tracking-wider ${
                  plan.highlighted ? "text-gray-400" : "text-gray-400"
                }`}>
                  {plan.name}
                </h4>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-[48px] font-light tracking-tight leading-none ${
                    plan.highlighted ? "text-white" : "text-black dark:text-white"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-[13px] ${
                    plan.highlighted ? "text-gray-400" : "text-gray-400"
                  }`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`mt-4 text-[13px] leading-relaxed ${
                  plan.highlighted ? "text-gray-400" : "text-gray-500 dark:text-gray-400"
                }`}>
                  {plan.desc}
                </p>
              </div>

              <div className="px-8 pb-8 pt-2 flex-1 flex flex-col">
                <div className={`w-full h-px mb-6 ${
                  plan.highlighted ? "bg-white/10" : "bg-gray-100 dark:bg-white/10"
                }`} />

                <ul className="flex-1 space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-3 text-[13px] ${
                        plan.highlighted ? "text-gray-300" : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      <svg className={`w-4 h-4 flex-shrink-0 ${
                        plan.highlighted ? "text-white/40" : "text-gray-300"
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.active ? (
                  <Link
                    to={plan.href}
                    className="inline-flex items-center justify-center w-full py-3 bg-black text-white text-[13px] font-medium hover:bg-black/90"
                  >
                    {plan.cta}
                  </Link>
                ) : plan.highlighted ? (
                  <div className="inline-flex items-center justify-center w-full py-3 bg-white/10 text-white text-[13px] font-medium cursor-not-allowed">
                    {plan.cta}
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-full py-3 border border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500 text-[13px] font-medium cursor-not-allowed">
                    {plan.cta}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
