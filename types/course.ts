// ============================================
// API RESPONSE TYPES
// ============================================

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnailUrl: string | null;
}

export interface CoursePageResponse {
  course: {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    modules: Array<{
      id: string;
      title: string;
      description: string | null;
      order: number;
      accessTier: string;
      lessons: Array<{
        id: string;
        title: string;
        duration: number;
        order: number;
        progress: {
          completed: boolean;
          lastWatched: number;
          completedAt: string | null;
        } | null;
      }>;
    }>;
  };
  accessType: string;
  status: string;
}

export interface LessonPageResponse {
  lesson: {
    id: string;
    title: string;
    videoUrl: string;
    content: string;
    duration: number;
    order: number;
    resources: any;
    progress: {
      completed: boolean;
      lastWatched: number;
      completedAt: string | null;
    } | null;
    module: {
      id: string;
      title: string;
      accessTier: string;
    };
    course: {
      id: string;
      title: string;
      slug: string;
    };
  };
  hasAccess: boolean;
  accessType: string;
}
