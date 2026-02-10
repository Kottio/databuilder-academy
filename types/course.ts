export interface Progress {
  completed: boolean;
  lastWatched: number;
  updatedAt: string;
  completedAt: string | null;
}
export interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  videoUrl: string;
  progress: Progress[] | [];
}
export interface Module {
  id: string;
  title: string;
  description: string | null;
  order: number;
  accessTier: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  modules: Module[];
}

// export interface CourseDashboardResponse {
//   courses: Course[];
//   accessType: string;
// }

export interface CoursePageResponse {
  course: Course;
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
    resources: JSON | null;
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
