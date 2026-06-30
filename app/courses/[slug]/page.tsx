'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Users,
  Clock,
  Globe,
  BarChart3,
  Calendar,
  CheckCircle2,
  Play,
  ChevronLeft,
  ChevronRight,
  Award,
  FileText,
  Download,
  Infinity as InfinityIcon,
  ThumbsUp,
} from 'lucide-react';
import { cn, formatUsdc, formatDate } from '@/lib/utils';
import { CurriculumAccordion } from '@/components/courses/CurriculumAccordion';
import type { Course, CourseModule, Lesson } from '@/types';

// ─── Placeholder data ────────────────────────────────────────────────────────

const PLACEHOLDER_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    courseId: 'course-placeholder',
    title: 'Getting Started',
    position: 1,
    lessons: [
      { id: 'l1', moduleId: 'mod-1', title: 'Welcome to the Course', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 180, content: null, resourceUrl: null, position: 1, isFree: true },
      { id: 'l2', moduleId: 'mod-1', title: 'Course Overview', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 420, content: null, resourceUrl: null, position: 2, isFree: true },
      { id: 'l3', moduleId: 'mod-1', title: 'Setting Up Your Workspace', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 540, content: null, resourceUrl: null, position: 3, isFree: false },
    ],
  },
  {
    id: 'mod-2',
    courseId: 'course-placeholder',
    title: 'Core Fundamentals',
    position: 2,
    lessons: [
      { id: 'l4', moduleId: 'mod-2', title: 'Understanding the Basics', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 720, content: null, resourceUrl: null, position: 1, isFree: false },
      { id: 'l5', moduleId: 'mod-2', title: 'Hands-On Practice', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 900, content: null, resourceUrl: null, position: 2, isFree: false },
      { id: 'l6', moduleId: 'mod-2', title: 'Common Mistakes to Avoid', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 480, content: null, resourceUrl: null, position: 3, isFree: true },
    ],
  },
  {
    id: 'mod-3',
    courseId: 'course-placeholder',
    title: 'Advanced Techniques',
    position: 3,
    lessons: [
      { id: 'l7', moduleId: 'mod-3', title: 'Professional Workflow', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 660, content: null, resourceUrl: null, position: 1, isFree: false },
      { id: 'l8', moduleId: 'mod-3', title: 'Real-World Project', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 1200, content: null, resourceUrl: null, position: 2, isFree: false },
    ],
  },
  {
    id: 'mod-4',
    courseId: 'course-placeholder',
    title: 'Final Project & Next Steps',
    position: 4,
    lessons: [
      { id: 'l9', moduleId: 'mod-4', title: 'Building Your Portfolio', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 1500, content: null, resourceUrl: null, position: 1, isFree: false },
      { id: 'l10', moduleId: 'mod-4', title: 'Where to Go From Here', description: null, type: 'VIDEO', videoUrl: '#', videoDuration: 300, content: null, resourceUrl: null, position: 2, isFree: true },
    ],
  },
];

const PLACEHOLDER_COURSE: Course = {
  id: 'course-placeholder',
  instructorAddress: 'GABCDEF1234567890',
  title: 'Complete Tailoring Masterclass: From Beginner to Professional',
  description:
    'Master the art of tailoring from scratch. Learn pattern drafting, cutting, sewing techniques, and garment construction in this comprehensive course designed for aspiring African fashion designers.',
  category: 'Tailoring',
  level: 'Beginner',
  language: 'English',
  thumbnailUrl: null,
  previewVideoUrl: '#',
  price: 49.99,
  platformFeePercent: 10,
  status: 'ACTIVE',
  totalLessons: 10,
  totalDuration: 6900,
  totalEnrollments: 1247,
  totalRevenue: 0,
  txHash: null,
  approvedAt: '2025-01-15T10:00:00Z',
  createdAt: '2025-01-10T08:00:00Z',
  updatedAt: '2025-06-20T14:30:00Z',
  instructor: {
    name: 'Amina Okafor',
    stellarAddress: 'GABCDEF1234567890',
    avatarUrl: null,
    bio: 'Amina is a professional tailor with over 15 years of experience in West African fashion design. She has trained hundreds of students and runs a successful fashion house in Lagos.',
  },
  modules: PLACEHOLDER_MODULES,
  _count: { enrollments: 1247 },
  rating: 4.7,
  reviewCount: 342,
  originalPrice: 79.99,
  badge: 'bestseller',
};

const LEARNING_POINTS = [
  'Draft professional patterns for various garment types',
  'Master cutting techniques for different fabrics',
  'Sew complete garments from start to finish',
  'Understand body measurements and fitting adjustments',
  'Work with African print fabrics (Ankara, Kente, Adire)',
  'Set up and maintain your sewing machine properly',
  'Create both men\'s and women\'s clothing designs',
  'Build a portfolio to attract paying clients',
];

const INCLUDES = [
  { icon: Play, label: '6.5 hours on-demand video' },
  { icon: FileText, label: '12 downloadable resources' },
  { icon: Download, label: 'Access on mobile and desktop' },
  { icon: InfinityIcon, label: 'Full lifetime access' },
  { icon: Award, label: 'Certificate of completion' },
];

interface PlaceholderReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const REVIEWS: PlaceholderReview[] = [
  {
    id: 'r1',
    name: 'Chiamaka E.',
    rating: 5,
    date: '2025-06-10T00:00:00Z',
    comment:
      'This course transformed my tailoring skills! The pattern drafting section alone was worth the price. Amina explains everything so clearly.',
  },
  {
    id: 'r2',
    name: 'Kwame A.',
    rating: 4,
    date: '2025-05-22T00:00:00Z',
    comment:
      'Great course overall. The hands-on projects really helped me practice. Would love to see more advanced techniques added in the future.',
  },
  {
    id: 'r3',
    name: 'Fatima B.',
    rating: 5,
    date: '2025-04-15T00:00:00Z',
    comment:
      'I started this course with zero sewing experience and now I can make my own clothes. Highly recommended for beginners!',
  },
];

const RELATED_COURSES: Course[] = [
  {
    id: 'rc-1',
    instructorAddress: 'G1',
    title: 'Advanced Pattern Drafting for African Prints',
    description: 'Take your pattern skills to the next level.',
    category: 'Tailoring',
    level: 'Intermediate',
    language: 'English',
    thumbnailUrl: null,
    previewVideoUrl: null,
    price: 59.99,
    platformFeePercent: 10,
    status: 'ACTIVE',
    totalLessons: 8,
    totalDuration: 4800,
    totalEnrollments: 430,
    totalRevenue: 0,
    txHash: null,
    approvedAt: null,
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2025-03-01T00:00:00Z',
    instructor: { name: 'Kofi M.', stellarAddress: 'G1', avatarUrl: null },
    modules: [],
    _count: { enrollments: 430 },
    rating: 4.5,
    reviewCount: 98,
  },
  {
    id: 'rc-2',
    instructorAddress: 'G2',
    title: 'Professional Makeup Artistry Basics',
    description: 'Start your career in professional makeup.',
    category: 'Makeup Artistry',
    level: 'Beginner',
    language: 'English',
    thumbnailUrl: null,
    previewVideoUrl: null,
    price: 39.99,
    platformFeePercent: 10,
    status: 'ACTIVE',
    totalLessons: 12,
    totalDuration: 7200,
    totalEnrollments: 890,
    totalRevenue: 0,
    txHash: null,
    approvedAt: null,
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-02-15T00:00:00Z',
    instructor: { name: 'Ngozi I.', stellarAddress: 'G2', avatarUrl: null },
    modules: [],
    _count: { enrollments: 890 },
    rating: 4.8,
    reviewCount: 215,
  },
  {
    id: 'rc-3',
    instructorAddress: 'G3',
    title: 'Cake Baking & Decoration Masterclass',
    description: 'Learn to bake and decorate professional cakes.',
    category: 'Baking',
    level: 'Beginner',
    language: 'English',
    thumbnailUrl: null,
    previewVideoUrl: null,
    price: 44.99,
    platformFeePercent: 10,
    status: 'ACTIVE',
    totalLessons: 15,
    totalDuration: 9000,
    totalEnrollments: 672,
    totalRevenue: 0,
    txHash: null,
    approvedAt: null,
    createdAt: '2025-01-20T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
    instructor: { name: 'Yemi O.', stellarAddress: 'G3', avatarUrl: null },
    modules: [],
    _count: { enrollments: 672 },
    rating: 4.6,
    reviewCount: 178,
  },
  {
    id: 'rc-4',
    instructorAddress: 'G4',
    title: 'Photography for Social Media Success',
    description: 'Create scroll-stopping content with your phone.',
    category: 'Photography',
    level: 'Beginner',
    language: 'English',
    thumbnailUrl: null,
    previewVideoUrl: null,
    price: 34.99,
    platformFeePercent: 10,
    status: 'ACTIVE',
    totalLessons: 10,
    totalDuration: 5400,
    totalEnrollments: 1105,
    totalRevenue: 0,
    txHash: null,
    approvedAt: null,
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-04-01T00:00:00Z',
    instructor: { name: 'Ade K.', stellarAddress: 'G4', avatarUrl: null },
    modules: [],
    _count: { enrollments: 1105 },
    rating: 4.4,
    reviewCount: 267,
  },
];

// ─── Category emoji helper ──────────────────────────────────────────────────

function categoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    Tailoring: '🧵',
    Baking: '🍰',
    Photography: '📷',
    'Makeup Artistry': '💄',
    Hairstyling: '💇',
    'Nail Technology': '💅',
    Catering: '🍽️',
    'Fashion Design': '👗',
  };
  return map[cat] ?? '🎓';
}

// ─── Page component ──────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const course = PLACEHOLDER_COURSE;
  const rating = course.rating ?? 0;
  const reviewCount = course.reviewCount ?? 0;
  const hasDiscount =
    course.originalPrice != null && course.originalPrice > course.price;
  const discountPct = hasDiscount
    ? Math.round((1 - course.price / course.originalPrice!) * 100)
    : 0;
  const totalHours = Math.floor(course.totalDuration / 3600);
  const totalMins = Math.floor((course.totalDuration % 3600) / 60);

  const [carouselIdx, setCarouselIdx] = useState(0);
  const visibleCount = 3;
  const maxIdx = Math.max(0, RELATED_COURSES.length - visibleCount);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Banner ── */}
      <section className="bg-[#26215C] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-hamplard-primary/20 px-3 py-1 text-xs font-semibold text-hamplard-lilac">
                {course.category}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                {course.level}
              </span>
              {course.badge && (
                <span className="rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-semibold text-saffron-200 capitalize">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {course.description}
            </p>

            {/* Stats row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-saffron-400">
                  {rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        'h-4 w-4',
                        s <= Math.round(rating)
                          ? 'fill-saffron-400 text-saffron-400'
                          : 'text-slate-500',
                      )}
                    />
                  ))}
                </div>
                <span className="text-slate-400">
                  ({reviewCount.toLocaleString()} ratings)
                </span>
              </div>

              <span className="flex items-center gap-1 text-slate-300">
                <Users className="h-4 w-4" />
                {course.totalEnrollments.toLocaleString()} students
              </span>

              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="h-4 w-4" />
                Last updated {formatDate(course.updatedAt)}
              </span>

              <span className="flex items-center gap-1 text-slate-300">
                <Globe className="h-4 w-4" />
                {course.language}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              Created by{' '}
              <span className="font-medium text-hamplard-lilac">
                {course.instructor.name ?? 'Instructor'}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content + sidebar ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* ── Left column ── */}
          <div className="space-y-12">
            {/* What you will learn */}
            <section>
              <h2 className="section-heading mb-6">What you will learn</h2>
              <div className="rounded-xl border border-ink-200 p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {LEARNING_POINTS.map((point) => (
                    <div key={point} className="flex gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-leaf-500" />
                      <span className="text-sm text-ink-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Course curriculum */}
            <section>
              <h2 className="section-heading mb-6">Course curriculum</h2>
              <CurriculumAccordion modules={course.modules} />
            </section>

            {/* Instructor bio */}
            <section>
              <h2 className="section-heading mb-6">About the instructor</h2>
              <div className="flex gap-5">
                <div className="flex-shrink-0">
                  {course.instructor.avatarUrl ? (
                    <img
                      src={course.instructor.avatarUrl}
                      alt={course.instructor.name ?? ''}
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-ink-100"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-hamplard-lilac text-2xl font-bold text-hamplard-deep">
                      {course.instructor.name?.charAt(0)?.toUpperCase() ?? 'I'}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">
                    {course.instructor.name ?? 'Instructor'}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {course.category} Expert
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-ink-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-saffron-400" />
                      {rating.toFixed(1)} rating
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.totalEnrollments.toLocaleString()} students
                    </span>
                  </div>
                  {course.instructor.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-700">
                      {course.instructor.bio}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Student reviews */}
            <section>
              <h2 className="section-heading mb-6">Student reviews</h2>

              {/* Review summary */}
              <div className="mb-6 flex items-center gap-6 rounded-xl bg-ink-50 p-5">
                <div className="text-center">
                  <p className="text-4xl font-bold text-ink-900">
                    {rating.toFixed(1)}
                  </p>
                  <div className="mt-1 flex justify-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          'h-4 w-4',
                          s <= Math.round(rating)
                            ? 'fill-saffron-400 text-saffron-400'
                            : 'text-ink-200',
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">
                    {reviewCount} ratings
                  </p>
                </div>

                {/* Rating bars */}
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((level) => {
                    const pct =
                      level === 5 ? 68 : level === 4 ? 22 : level === 3 ? 7 : level === 2 ? 2 : 1;
                    return (
                      <div key={level} className="flex items-center gap-2">
                        <span className="w-8 text-right text-xs text-ink-500">
                          {level}★
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-ink-100">
                          <div
                            className="h-full rounded-full bg-saffron-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-xs text-ink-400">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review list */}
              <div className="divide-y divide-ink-100">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="py-5 first:pt-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hamplard-lilac text-sm font-semibold text-hamplard-deep">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink-900">
                            {review.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={cn(
                                    'h-3.5 w-3.5',
                                    s <= review.rating
                                      ? 'fill-saffron-400 text-saffron-400'
                                      : 'text-ink-200',
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-ink-400">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-xs text-ink-400 transition-colors hover:text-ink-700"
                        aria-label="Helpful"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Helpful
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related courses carousel */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="section-heading">Related courses</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCarouselIdx((i) => Math.max(0, i - 1))}
                    disabled={carouselIdx === 0}
                    className="rounded-lg border border-ink-200 p-2 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40"
                    aria-label="Previous courses"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCarouselIdx((i) => Math.min(maxIdx, i + 1))
                    }
                    disabled={carouselIdx >= maxIdx}
                    className="rounded-lg border border-ink-200 p-2 text-ink-500 transition-colors hover:bg-ink-50 disabled:opacity-40"
                    aria-label="Next courses"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${carouselIdx * (100 / visibleCount)}%)`,
                  }}
                >
                  {RELATED_COURSES.map((rc) => (
                    <Link
                      key={rc.id}
                      href={`/courses/${rc.id}`}
                      className="block w-full flex-shrink-0 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                    >
                      <article className="card overflow-hidden transition-shadow hover:shadow-lifted">
                        <div className="relative aspect-video bg-gradient-to-br from-saffron-100 to-saffron-200">
                          <div className="absolute inset-0 flex items-center justify-center text-4xl">
                            {categoryEmoji(rc.category)}
                          </div>
                          <div className="absolute top-2.5 left-2.5">
                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink-700">
                              {rc.level}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-xs font-medium text-saffron-600">
                            {rc.category}
                          </p>
                          <h3 className="mt-1 text-sm font-semibold text-ink-900 line-clamp-2 leading-snug">
                            {rc.title}
                          </h3>
                          <p className="mt-1 text-xs text-ink-500">
                            {rc.instructor.name}
                          </p>
                          {rc.rating != null && (
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-xs font-semibold text-ink-700">
                                {rc.rating.toFixed(1)}
                              </span>
                              <Star className="h-3.5 w-3.5 fill-saffron-400 text-saffron-400" />
                              <span className="text-xs text-ink-400">
                                ({rc.reviewCount})
                              </span>
                            </div>
                          )}
                          <p className="mt-2 text-sm font-bold text-ink-900">
                            {formatUsdc(rc.price)}{' '}
                            <span className="text-xs font-normal text-ink-400">
                              USDC
                            </span>
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ── Sticky right sidebar (desktop) ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-[80px]">
              <div className="card overflow-hidden">
                {/* Preview video thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-hamplard-lilac to-saffron-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl">
                      {categoryEmoji(course.category)}
                    </span>
                  </div>
                  {course.previewVideoUrl && (
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                      aria-label="Play preview"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <Play className="h-6 w-6 text-hamplard-deep ml-1" />
                      </div>
                    </button>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-ink-900">
                      {formatUsdc(course.price)}
                    </span>
                    <span className="text-sm text-ink-400">USDC</span>
                    {hasDiscount && course.originalPrice != null && (
                      <>
                        <span className="text-lg text-ink-400 line-through">
                          {formatUsdc(course.originalPrice)}
                        </span>
                        <span className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
                          -{discountPct}% off
                        </span>
                      </>
                    )}
                  </div>

                  {/* Enroll CTA */}
                  <button
                    type="button"
                    className="btn-primary w-full py-3 text-base font-semibold"
                  >
                    Enroll Now
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    30-day money-back guarantee
                  </p>

                  {/* What is included */}
                  <div className="border-t border-ink-100 pt-4">
                    <h4 className="mb-3 text-sm font-semibold text-ink-900">
                      This course includes
                    </h4>
                    <ul className="space-y-2.5">
                      {INCLUDES.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center gap-2.5 text-sm text-ink-700"
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0 text-ink-400" />
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course stats */}
                  <div className="border-t border-ink-100 pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Duration</span>
                      <span className="font-medium text-ink-900">
                        {totalHours}h {totalMins}m
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Lectures</span>
                      <span className="font-medium text-ink-900">
                        {course.totalLessons}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Level</span>
                      <span className="font-medium text-ink-900">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink-500">Language</span>
                      <span className="font-medium text-ink-900">
                        {course.language}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Mobile sticky bottom CTA bar ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white p-3 shadow-lg lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-ink-900">
                {formatUsdc(course.price)}
              </span>
              <span className="text-xs text-ink-400">USDC</span>
              {hasDiscount && course.originalPrice != null && (
                <span className="text-sm text-ink-400 line-through">
                  {formatUsdc(course.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn-primary flex-shrink-0 px-6 py-3 text-sm font-semibold"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
