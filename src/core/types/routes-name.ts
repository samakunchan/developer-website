export enum RouteNameType {
  // Public
  Home = '/',
  Projects = '/projects',
  AboutMe = '/about-me',
  ContactMe = '/contact-me',
  Services = '/services',
  Login = '/login',
  NotFound = '/not-found',
  UnAuthorize = '/un-authorize',

  // Visitor
  VisitorCgu = '/visitor/cgu',
  VisitorPrivacyPolicy = '/visitor/privacy-policy',
  VisitorCookiePolicy = '/visitor/cookie-policy',
  VisitorLegalMentions = '/visitor/legal-mentions',

  // Admin Dashboard
  AdminDashboard = '/admin/dashboard',

  // Admin Analytics
  AdminAnalytics = '/admin/analytics',

  // Admin Settings
  AdminThemes = '/admin/settings/themes',
  AdminLegalMentions = '/admin/settings/legal-mentions',
  AdminCGU = '/admin/settings/cgu',
  AdminPrivacy = '/admin/settings/privacy',
  AdminCookiePolicy = '/admin/settings/cookie-policy',

  // Admin Projects
  AdminProjects = '/admin/projects',
  AdminProjectsNew = '/admin/projects/new',
  AdminProjectsEdit = '/admin/projects/$projectId/edit',

  // Admin Profiles
  AdminProfileOverview = '/admin/profiles/overview',
  AdminProfilePersonalInfo = '/admin/profiles/personal-info',
  AdminProfileTechStacks = '/admin/profiles/tech-stacks',
  AdminProfileSocialLinks = '/admin/profiles/social-links',
}
