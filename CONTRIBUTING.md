# Contributing to getDone

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/getDone.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Environment Setup

1. Backend setup:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your local settings
   ```

2. Frontend setup:
   ```bash
   cd frontend
   npm install
   ```

## Making Changes

1. Make your changes
2. Test thoroughly
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request

## Code Style

- Follow existing code formatting
- Add comments for complex logic
- Update documentation when needed
- Write meaningful commit messages

## Testing

- Add tests for new features
- Ensure all existing tests pass
- Test in both development and production modes
