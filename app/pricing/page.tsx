"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI-powered meeting features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl transform rotate-1"></div>
              <SpotlightCard className="relative bg-white rounded-3xl shadow-2xl border border-emerald-100 p-10 h-full hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Basic</h3>
                  <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
                  <p className="text-gray-600 text-lg">Perfect for getting started</p>
                </div>

                <ul className="space-y-4 mb-10">
                  <FeatureItem text="300 minutes of recording per month" />
                  <FeatureItem text="Real-time transcription" />
                  <FeatureItem text="AI-generated summaries" />
                  <FeatureItem text="Basic integrations (Zoom, Teams)" />
                  <FeatureItem text="Email summaries" />
                  <FeatureItem text="Mobile app access" />
                </ul>

                <Link
                  href="/sign-up"
                  className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </Link>
              </SpotlightCard>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                  <Star size={16} className="fill-current" />
                  Most Popular
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl transform -rotate-1 opacity-20"></div>
              <SpotlightCard className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-10 h-full hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-8 pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <Star size={32} className="text-yellow-300" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Pro</h3>
                  <div className="text-5xl font-bold mb-2">$19<span className="text-xl font-normal">/month</span></div>
                  <p className="opacity-90 text-lg">For teams that need more</p>
                </div>

                <ul className="space-y-4 mb-10">
                  <FeatureItem text="Unlimited recording minutes" pro />
                  <FeatureItem text="Advanced AI insights" pro />
                  <FeatureItem text="Priority support" pro />
                  <FeatureItem text="Team collaboration tools" pro />
                  <FeatureItem text="Custom integrations" pro />
                  <FeatureItem text="Advanced analytics" pro />
                  <FeatureItem text="API access" pro />
                </ul>

                <Link
                  href="/sign-up"
                  className="block w-full bg-white text-purple-600 text-center py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </Link>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose MeetNote Pro?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock the full potential of your meetings with advanced features designed for growing teams.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Unlimited Usage</h3>
              <p className="text-gray-600">Record as many meetings as you need without worrying about limits.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Advanced AI</h3>
              <p className="text-gray-600">Get deeper insights with sentiment analysis and topic clustering.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Team Features</h3>
              <p className="text-gray-600">Share summaries, assign action items, and collaborate seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            <FAQItem
              question="Can I change plans anytime?"
              answer="Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
            />
            <FAQItem
              question="What happens to my data if I cancel?"
              answer="Your data remains accessible for 30 days after cancellation. You can export all your meeting data."
            />
            <FAQItem
              question="Do you offer team discounts?"
              answer="Yes, we offer discounts for teams of 10+ users. Contact our sales team for custom pricing."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Absolutely. We use enterprise-grade encryption and comply with SOC 2 and GDPR standards."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Upgrade Your Meetings?</h2>
          <p className="text-xl opacity-90">
            Experience the difference MeetNote Pro can make for your team.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ text, pro = false }: { text: string; pro?: boolean }) {
  return (
    <li className={`flex items-center gap-3 ${pro ? 'text-white' : 'text-gray-700'}`}>
      <Check size={20} className={pro ? 'text-white' : 'text-green-600'} />
      <span>{text}</span>
    </li>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}