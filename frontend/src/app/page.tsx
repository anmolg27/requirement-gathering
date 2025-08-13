import type { Metadata } from 'next';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { 
  Description as DocumentIcon, 
  VideoCall as MeetingIcon, 
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Folder as FolderIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import React from 'react'; // Added missing import for React

export const metadata: Metadata = {
  title: 'Requirements Gathering Platform - AI-Powered Project Management',
  description: 'Streamline your requirements gathering process with AI-powered document analysis, meeting transcription, and intelligent project management. Get accurate estimates and insights.',
  keywords: 'requirements gathering, AI, project management, document analysis, meeting transcription, software development',
  openGraph: {
    title: 'Requirements Gathering Platform - AI-Powered Project Management',
    description: 'Streamline your requirements gathering process with AI-powered document analysis, meeting transcription, and intelligent project management.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Requirements Gathering Platform - AI-Powered Project Management',
    description: 'Streamline your requirements gathering process with AI-powered document analysis, meeting transcription, and intelligent project management.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const features = [
  {
    icon: <DocumentIcon />,
    title: 'Document Analysis',
    description: 'Upload and analyze client documents with AI-powered text extraction and content understanding.',
    color: '#6366f1',
  },
  {
    icon: <MeetingIcon />,
    title: 'Meeting Transcription',
    description: 'Automatically transcribe Zoom meetings and extract key requirements and action items.',
    color: '#ec4899',
  },
  {
    icon: <ChatIcon />,
    title: 'AI Chat Assistant',
    description: 'Get instant answers, summaries, and insights from your project data using advanced AI models.',
    color: '#10b981',
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Smart Analytics',
    description: 'Generate accurate project estimates and identify improvement areas with AI-driven insights.',
    color: '#3b82f6',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with end-to-end encryption and GDPR compliance.',
    color: '#f59e0b',
  },
  {
    icon: <SpeedIcon />,
    title: 'Fast & Efficient',
    description: 'Streamlined workflow that saves hours of manual requirements gathering and analysis.',
    color: '#8b5cf6',
  },
];

const stats = [
  { number: '500+', label: 'Projects Completed', icon: <FolderIcon /> },
  { number: '50K+', label: 'Documents Analyzed', icon: <DocumentIcon /> },
  { number: '95%', label: 'Accuracy Rate', icon: <CheckCircleIcon /> },
  { number: '24/7', label: 'AI Support', icon: <ChatIcon /> },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Project Manager',
    company: 'TechCorp',
    content: 'ReqGather has revolutionized how we handle requirements. The AI insights are incredibly accurate and save us hours of manual work.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer',
    company: 'InnovateSoft',
    content: 'The meeting transcription feature is a game-changer. We never miss important details from client meetings anymore.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Business Analyst',
    company: 'DataFlow',
    content: 'The AI chat assistant helps us quickly generate estimates and identify potential issues before they become problems.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          py: { xs: 6, md: 12 },
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Chip 
                  label="AI-Powered Platform" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 2
                  }}
                />
              </Box>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                AI-Powered Requirements Gathering
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Transform how you collect, analyze, and manage project requirements with intelligent automation and AI insights.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                    }
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  size="large"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: '#6366f1',
                    color: '#6366f1',
                    '&:hover': { 
                      borderColor: '#818cf8',
                      background: 'rgba(99, 102, 241, 0.1)'
                    } 
                  }}
                >
                  Sign In
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Free 14-day trial</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">No credit card required</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">Cancel anytime</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 300,
                  height: 300,
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: -1,
                }
              }}>
                <Box sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                }}>
                  <Typography variant="h2" sx={{ color: 'white', fontWeight: 800 }}>
                    RG
                  </Typography>
                </Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ReqGather
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card sx={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                  border: '1px solid #334155',
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                    borderColor: '#6366f1',
                  }
                }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ 
                      color: '#6366f1', 
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Everything You Need for Requirements Gathering
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              From document upload to AI-powered analysis, we've got you covered with comprehensive tools and insights
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                  border: '1px solid #334155',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                    borderColor: feature.color,
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                      border: `1px solid ${feature.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}>
                      {React.cloneElement(feature.icon, { 
                        sx: { fontSize: 32, color: feature.color } 
                      })}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ 
        py: 8,
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Simple three-step process to transform your requirements gathering workflow
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '1',
                title: 'Upload & Connect',
                description: 'Upload client documents and connect your Zoom meetings. Our AI automatically processes and extracts key information.',
                icon: <FolderIcon />
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Advanced AI models analyze your content, extract requirements, and identify patterns and insights.',
                icon: <AnalyticsIcon />
              },
              {
                step: '3',
                title: 'Get Insights',
                description: 'Chat with AI to get summaries, estimates, and recommendations. Export reports and share with your team.',
                icon: <ChatIcon />
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                  border: '1px solid #334155',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                    borderColor: '#6366f1',
                  }
                }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3
                  }}>
                    {React.cloneElement(item.icon, { 
                      sx: { fontSize: 32, color: 'white' } 
                    })}
                  </Box>
                  <Typography variant="h4" sx={{ color: '#6366f1', mb: 2, fontWeight: 700 }}>
                    {item.step}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              What Our Users Say
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Join thousands of teams who trust ReqGather for their requirements gathering needs
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)',
                  border: '1px solid #334155',
                  borderRadius: 3,
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                    borderColor: '#6366f1',
                  }
                }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#fbbf24', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      width: 48, 
                      height: 48, 
                      mr: 2,
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
                    }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Card sx={{ 
            p: 6, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            border: '1px solid #334155',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none',
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Ready to Transform Your Requirements Gathering?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.6 }}>
                Join thousands of teams who are already saving time and improving accuracy with AI-powered requirements gathering.
              </Typography>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  }
                }}
              >
                Start Your Free Trial
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
