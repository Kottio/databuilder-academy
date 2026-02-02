import "dotenv/config"; // Load environment variables
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting seed...");

  // Create a course
  const course = await prisma.course.create({
    data: {
      title: "Full Stack Data Builder",
      slug: "full-stack-data-builder",
      description:
        "Learn to build production-ready data pipelines with Docker, APIs, and modern data tools. Master containerization, data processing, and deployment strategies.",
      price: 9900, // €99.00
      published: true,
    },
  });

  console.log("✅ Created course:", course.title);

  // Create Module 1 (FREE)
  const module1 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: "Module 1: Foundation Setup",
      description:
        "Get started with Docker and containers. Learn the fundamentals of containerization and set up your development environment.",
      order: 1,
      accessTier: "FREE",
    },
  });

  console.log("✅ Created module:", module1.title);

  // Create 3 lessons for Module 1
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module1.id,
        title: "Welcome & Overview",
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
        resources: JSON.stringify([
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
        ]),
      },
      {
        moduleId: module1.id,
        title: "Installing Docker",
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
        resources: JSON.stringify([
          {
            id: "resource-3",
            title: "Docker Installation Guide",
            type: "link",
            url: "https://docs.docker.com/get-docker/",
          },
        ]),
      },
      {
        moduleId: module1.id,
        title: "Your First Container",
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
        resources: JSON.stringify([
          {
            id: "resource-4",
            title: "Docker CLI Cheat Sheet",
            type: "download",
            url: "#",
          },
        ]),
      },
    ],
  });

  console.log("✅ Created 3 lessons for Module 1");

  // Create Module 2 (PAID)
  const module2 = await prisma.module.create({
    data: {
      courseId: course.id,
      title: "Module 2: Container Fundamentals",
      description:
        "Deep dive into Docker containers, images, and networking. Build production-ready containerized applications.",
      order: 2,
      accessTier: "PAID",
    },
  });

  console.log("✅ Created module:", module2.title);

  // Create 3 lessons for Module 2
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module2.id,
        title: "Understanding Images",
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
      },
      {
        moduleId: module2.id,
        title: "Container Networking",
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
      },
      {
        moduleId: module2.id,
        title: "Docker Volumes & Data Persistence",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: `# Docker Volumes & Data Persistence

Containers are ephemeral by default. Learn how to persist data across container restarts.

## Why Volumes?

- Containers are stateless
- Data is lost when container is removed
- Volumes provide persistent storage

## Creating Volumes

\`\`\`bash
# Create a named volume
docker volume create mydata

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect mydata
\`\`\`

## Using Volumes

\`\`\`bash
docker run -v mydata:/app/data myapp
\`\`\`

## Bind Mounts vs Volumes

**Volumes** (recommended):
- Managed by Docker
- Portable across systems
- Better performance

**Bind Mounts**:
- Direct host path mapping
- Good for development
- \`docker run -v /host/path:/container/path\`

## Volume Best Practices

1. Use named volumes for production
2. Backup volumes regularly
3. Clean up unused volumes
4. Use volume drivers for cloud storage

## Example: Database Container

\`\`\`bash
docker run -d \\
  --name postgres \\
  -v pgdata:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:16
\`\`\`

Data persists even if container is removed! 💾`,
        duration: 15,
        order: 3,
      },
    ],
  });

  console.log("✅ Created 3 lessons for Module 2");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\nCreated:");
  console.log(`- 1 Course: ${course.title}`);
  console.log(`- 2 Modules (1 FREE, 1 PAID)`);
  console.log(`- 6 Lessons (3 per module)`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
