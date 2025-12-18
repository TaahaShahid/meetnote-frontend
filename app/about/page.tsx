"use client";

import { motion } from "framer-motion";
import { Users, Target, Sparkles, CheckCircle, Mic, Calendar, Video } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
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
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MeetNote</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to revolutionize how teams capture and utilize meeting insights through AI-powered intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                In today's fast-paced business environment, meetings are the lifeblood of collaboration.
                Yet, valuable insights often get lost in the noise. MeetNote was born to change that.
              </p>
              <p className="text-lg text-gray-600">
                We believe every conversation holds untapped potential. Our AI technology ensures
                that no important detail, action item, or decision goes unnoticed.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Target size={120} className="text-blue-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              MeetNote combines cutting-edge AI with seamless integration to deliver
              the most comprehensive meeting intelligence platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Mic size={32} />}
              title="Real-Time Transcription"
              description="Advanced speech-to-text technology captures every word with industry-leading accuracy."
            />
            <FeatureCard
              icon={<Sparkles size={32} />}
              title="AI-Powered Summaries"
              description="Intelligent algorithms extract key points, action items, and decisions automatically."
            />
            <FeatureCard
              icon={<Calendar size={32} />}
              title="Smart Integration"
              description="Seamlessly connects with Zoom, Teams, Google Meet, and calendar applications."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A passionate group of engineers, designers, and AI experts dedicated to
              transforming how the world captures meeting intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember
              name="Sarah Chen"
              role="CEO & Co-Founder"
              bio="Former AI researcher at Google, passionate about democratizing AI for productivity."
            />
            <TeamMember
              name="Marcus Rodriguez"
              role="CTO & Co-Founder"
              bio="Ex-Microsoft engineer with 10+ years in speech recognition and NLP technologies."
            />
            <TeamMember
              name="Emily Watson"
              role="Head of Product"
              bio="Product leader from Slack, focused on building intuitive AI-powered experiences."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Meetings?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of teams already using MeetNote to capture every important moment.
          </p>
          <a
            href="/sign-up"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <SpotlightCard className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </SpotlightCard>
  );
}

function TeamMember({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <Users size={48} className="text-blue-600" />
      </div>
      <h3 className="font-semibold text-xl mb-1">{name}</h3>
      <p className="text-blue-600 mb-2">{role}</p>
      <p className="text-gray-600 text-sm">{bio}</p>
    </div>
  );
}