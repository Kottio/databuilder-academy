import type { Course } from "@/types/course";

/**
 * Mock course data - In production, this will come from the database
 */
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Full Stack Data Builder",
    slug: "full-stack-data-builder",
    description:
      "Learn to build production-ready data pipelines with Docker, APIs, and modern data tools. Master containerization, data processing, and deployment strategies.",
    thumbnailUrl: undefined,
    price: 9900, // €99.00 in cents
    isFree: false,
    published: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    modules: [
      {
        id: "module-1",
        courseId: "course-1",
        title: "Module 1: Foundation Setup",
        description:
          "Get started with Docker and containers. Learn the fundamentals of containerization and set up your development environment.",
        order: 1,
        accessType: "free",
        isFree: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        lessons: [
          {
            id: "lesson-1",
            moduleId: "module-1",
            title: "Welcome & Overview",
            description:
              "Introduction to the course and what you'll learn throughout the modules",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: `# Welcome to Full Stack Data Builder Academy!

## What You'll Learn

In this comprehensive course, you'll master:

- **Docker & Containerization**: Build and deploy containerized applications
- **Data Pipeline Design**: Create robust, scalable data workflows
- **API Development**: Build RESTful and GraphQL APIs
- **Cloud Deployment**: Deploy to production environments

## Course Structure

This course is divided into 8 modules, covering everything from basics to advanced topics.

### Module Breakdown

- **Module 1** (FREE): Foundation Setup
- **Modules 2-8** (€99): Advanced concepts and production deployment

## Prerequisites

- Basic programming knowledge (Python or JavaScript recommended)
- Familiarity with command line
- A computer with 8GB+ RAM

## Let's Get Started!

Ready to become a data builder? Let's dive in! 🚀`,
            duration: 5,
            order: 1,
            resources: [
              {
                id: "resource-1",
                title: "Course Syllabus PDF",
                type: "download",
                url: "#",
                description: "Complete course outline and learning objectives",
              },
              {
                id: "resource-2",
                title: "Course GitHub Repository",
                type: "github",
                url: "https://github.com",
                description: "Access all code examples and exercises",
              },
            ],
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          },
          {
            id: "lesson-2",
            moduleId: "module-1",
            title: "Installing Docker",
            description:
              "Step-by-step guide to installing Docker on your machine",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: `# Installing Docker

Docker is essential for modern development. Let's get it set up on your machine.

## Installation Steps

### macOS

\`\`\`bash
# Download Docker Desktop from docker.com
# Or use Homebrew
brew install --cask docker
\`\`\`

### Linux

\`\`\`bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

### Windows

Download Docker Desktop from the official website: https://docker.com

## Verify Installation

After installation, verify Docker is working:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

You should see output confirming Docker is installed correctly.

## Common Issues

### Permission Denied (Linux)

Add your user to the docker group:

\`\`\`bash
sudo usermod -aG docker $USER
\`\`\`

Log out and back in for changes to take effect.

## Next Steps

Once Docker is installed, we'll run our first container! 🐳`,
            duration: 10,
            order: 2,
            resources: [
              {
                id: "resource-3",
                title: "Docker Installation Guide",
                type: "link",
                url: "https://docs.docker.com/get-docker/",
              },
            ],
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          },
          {
            id: "lesson-3",
            moduleId: "module-1",
            title: "Your First Container",
            description: "Learn how to run your first Docker container",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: `# Your First Container

Let's run our first Docker container and understand what's happening under the hood.

## Running Hello World

\`\`\`bash
docker run hello-world
\`\`\`

This command:
1. Downloads the \`hello-world\` image from Docker Hub
2. Creates a container from that image
3. Runs the container
4. Displays a message
5. Exits

## Understanding Docker Commands

### List Running Containers

\`\`\`bash
docker ps
\`\`\`

### List All Containers (including stopped)

\`\`\`bash
docker ps -a
\`\`\`

### Run an Interactive Container

\`\`\`bash
docker run -it ubuntu bash
\`\`\`

This gives you a shell inside an Ubuntu container!

## Container Lifecycle

1. **Create**: \`docker create\`
2. **Start**: \`docker start\`
3. **Stop**: \`docker stop\`
4. **Remove**: \`docker rm\`

## Try It Yourself

Run a simple web server:

\`\`\`bash
docker run -d -p 8080:80 nginx
\`\`\`

Visit http://localhost:8080 to see it running!

## Key Takeaways

- Containers are lightweight and isolated
- Images are templates for containers
- Docker Hub provides thousands of pre-built images

Great job! You've run your first container! 🎉`,
            duration: 15,
            order: 3,
            resources: [
              {
                id: "resource-4",
                title: "Docker CLI Cheat Sheet",
                type: "download",
                url: "#",
              },
            ],
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          },
        ],
      },
      {
        id: "module-2",
        courseId: "course-1",
        title: "Module 2: Container Fundamentals",
        description:
          "Deep dive into Docker containers, images, and networking. Build production-ready containerized applications.",
        order: 2,
        accessType: "paid",
        isFree: false,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        lessons: [
          {
            id: "lesson-4",
            moduleId: "module-2",
            title: "Understanding Images",
            description: "Learn how Docker images work and how to build custom images",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: `# Understanding Docker Images

Images are the foundation of containers. Let's learn how they work.

## What is a Docker Image?

A Docker image is a read-only template containing:
- Application code
- Runtime environment
- System libraries
- Dependencies

## Image Layers

Images are built in layers. Each instruction in a Dockerfile creates a new layer.

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
\`\`\`

## Building Your First Image

\`\`\`bash
docker build -t myapp:v1 .
\`\`\`

## Best Practices

- Use specific base image tags
- Minimize layers
- Use \`.dockerignore\`
- Multi-stage builds for production

Coming up: Building optimized images! 🏗️`,
            duration: 12,
            order: 1,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          },
          {
            id: "lesson-5",
            moduleId: "module-2",
            title: "Container Networking",
            description: "Master Docker networking and container communication",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: `# Container Networking

Learn how containers communicate with each other and the outside world.

## Network Types

1. **Bridge** (default): Isolated network for containers
2. **Host**: Use host's network directly
3. **None**: No networking

## Creating Networks

\`\`\`bash
docker network create mynetwork
\`\`\`

## Connecting Containers

\`\`\`bash
docker run --network=mynetwork --name=app1 myapp
docker run --network=mynetwork --name=app2 myapp
\`\`\`

Now \`app1\` and \`app2\` can communicate!

## Port Mapping

\`\`\`bash
docker run -p 3000:3000 myapp
\`\`\`

Maps container port 3000 to host port 3000.

## Docker Compose

For multi-container applications:

\`\`\`yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
\`\`\`

Networking made easy! 🌐`,
            duration: 18,
            order: 2,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          },
        ],
      },
    ],
  },
];

/**
 * Get course by slug
 */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

/**
 * Get lesson by ID across all courses
 */
export function getLessonById(lessonId: string) {
  for (const course of courses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { course, module, lesson };
      }
    }
  }
  return null;
}
