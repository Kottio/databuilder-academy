// ============================================
// COURSE PLATFORM TYPE DEFINITIONS
// ============================================

/**
 * Course - Top level entity
 * Represents a complete course (e.g., "Full Stack Data Builder Academy")
 */
export interface Course {
  id: string;
  title: string;
  slug: string; // URL-friendly identifier (e.g., "full-stack-data-builder")
  description: string;
  thumbnailUrl?: string;
  price: number; // Price in cents (e.g., 9900 = €99.00)
  isFree: boolean; // Is the entire course free?
  published: boolean; // Is the course visible to students?
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Module Access Types
 * - 'free': Available to everyone (lead magnet)
 * - 'paid': Requires base course payment
 * - 'extension': Separate paid extension (future feature)
 */
export type ModuleAccessType = 'free' | 'paid' | 'extension';

/**
 * Module - Mid-level entity
 * Represents a section/module within a course (e.g., "Module 1: Foundation Setup")
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number; // Display order within the course (1, 2, 3, etc.)
  accessType: ModuleAccessType; // What access level is required?
  isFree: boolean; // Backward compatible: true if accessType === 'free'
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Lesson - Lowest level entity
 * Represents a single lesson/video within a module
 */
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  videoUrl: string; // YouTube embed URL or video platform URL
  content?: string; // Markdown content for the lesson
  duration: number; // Duration in minutes
  order: number; // Display order within the module (1, 2, 3, etc.)
  resources?: LessonResource[]; // Downloadable resources, links, etc.
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Lesson Resource - Attachments for a lesson
 * Could be downloads, external links, code repos, etc.
 */
export interface LessonResource {
  id: string;
  title: string;
  type: 'download' | 'link' | 'github' | 'code';
  url: string;
  description?: string;
}

/**
 * User Progress - Tracks student progress through lessons
 */
export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean; // Has the student marked this as complete?
  lastWatched: number; // Last video timestamp in seconds
  updatedAt: Date;
}

/**
 * Enrollment - Links users to courses they have access to
 *
 * Future enhancement: Add `extensionModules` field to track
 * which extension modules the user has purchased separately
 */
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'cancelled';
  // Future: extensionModules?: string[]; // Array of module IDs with extended access
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// UTILITY TYPES & HELPERS
// ============================================

/**
 * Course with full nested data (modules + lessons)
 */
export interface CourseWithContent extends Course {
  modules: ModuleWithLessons[];
}

/**
 * Module with its lessons
 */
export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

/**
 * Lesson with progress data for a specific user
 */
export interface LessonWithProgress extends Lesson {
  progress?: Progress;
}

/**
 * Module with lessons that include progress
 */
export interface ModuleWithProgress extends Module {
  lessons: LessonWithProgress[];
}

/**
 * Course with modules and lessons, including user progress
 */
export interface CourseWithProgress extends Course {
  modules: ModuleWithProgress[];
  enrollment?: Enrollment;
}

/**
 * Minimal course info for listings
 */
export type CourseCard = Pick<Course, 'id' | 'title' | 'slug' | 'description' | 'thumbnailUrl' | 'price' | 'isFree'>;

/**
 * Navigation item for course sidebar
 */
export interface CourseNavigation {
  course: Pick<Course, 'id' | 'title' | 'slug'>;
  modules: Array<{
    id: string;
    title: string;
    order: number;
    isFree: boolean;
    lessons: Array<{
      id: string;
      title: string;
      order: number;
      duration: number;
      completed: boolean;
      locked: boolean; // Is this lesson locked for the current user?
    }>;
  }>;
}
