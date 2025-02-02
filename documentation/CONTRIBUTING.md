# 🚀 Contributing Guide

Thank you for considering contributing to this project! 🎉 To ensure a smooth workflow, please follow these guidelines.

---

## 📢 **Getting Started**

### 🔍 **1. Open an Issue First**
Before contributing any **new feature**:
- **Open an issue** describing the feature and its benefits.
- Discuss the implementation to align with project goals.
- Once approved, proceed with development.

For **bugs**, **security issues**, or **documentation requests**:
- Use the appropriate **issue templates** when creating an issue.
- This ensures all necessary information is collected.

---

## 🌱 **Branching Strategy**

- Always work on a **separate branch**:
  - Name it descriptively (e.g., `feature/add-login`, `fix/navbar-crash`).
  - Avoid working directly on the `main` or `master` branch.
- Ensure your branch is up-to-date with the latest changes from `main`.

---

## 📝 **Pull Request (PR) Guidelines**

### 📋 **Creating a PR**
1. **Document Your Changes**: Provide a clear and concise description of:
   - What the PR achieves or fixes.
   - Major changes and rationale.
2. **Breaking Changes**: Highlight and clearly notify any **breaking changes**.
3. **Related Issues**: Link to the related issue(s) using `Fixes #issue-number` or `Closes #issue-number`.

### ✅ **Checklist Before Submitting**
- [ ] Code follows the project's style guidelines.
- [ ] Tests have been added/updated for the changes.
- [ ] All tests and CI/CD checks pass.
- [ ] Documentation has been updated if needed.

---

## 📦 **Commit Message Conventions**

Clear commit messages help maintain an understandable project history. Use structured commit messages to indicate the type of changes made.

### 📌 **Recommended Format**
```plaintext
<type>(<scope>): <subject>

<body> (optional)
<footer> (optional, e.g., BREAKING CHANGE)
```

### **Common Types:**
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `style`: Changes that do not affect the code (e.g., formatting).
- `refactor`: Code changes that improve structure without altering functionality.
- `test`: Adding or updating tests.
- `chore`: Maintenance or setup tasks.

**Reference Guide:**  
For more details, see [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).