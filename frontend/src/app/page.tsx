import type { Metadata } from 'next';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import { 
  Description as DocumentIcon, 
  VideoCall as MeetingIcon, 
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import Link from 'next/link';

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
    icon: <DocumentIcon sx={{ fontSize: 40 }} />,
    title: 'Document Analysis',
    description: 'Upload and analyze client documents with AI-powered text extraction and content understanding.',
  },
  {
    icon: <MeetingIcon sx={{ fontSize: 40 }} />,
    title: 'Meeting Transcription',
    description: 'Automatically transcribe Zoom meetings and extract key requirements and action items.',
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    title: 'AI Chat Assistant',
    description: 'Get instant answers, summaries, and insights from your project data using advanced AI models.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: 'Smart Analytics',
    description: 'Generate accurate project estimates and identify improvement areas with AI-driven insights.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with end-to-end encryption and GDPR compliance.',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'Fast & Efficient',
    description: 'Streamlined workflow that saves hours of manual requirements gathering and analysis.',
  },
];

export default function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                AI-Powered Requirements Gathering
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Transform how you collect, analyze, and manage project requirements with intelligent automation and AI insights.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'grey.300' } }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontSize: '4rem', fontWeight: 'bold', opacity: 0.1 }}>
                  ReqGather
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Everything You Need for Requirements Gathering
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          From document upload to AI-powered analysis, we've got you covered
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Simple three-step process to transform your requirements gathering
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>1</Typography>
                <Typography variant="h6" gutterBottom>Upload & Connect</Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload client documents and connect your Zoom meetings. Our AI automatically processes and extracts key information.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>2</Typography>
                <Typography variant="h6" gutterBottom>AI Analysis</Typography>
                <Typography variant="body2" color="text.secondary">
                  Advanced AI models analyze your content, extract requirements, and identify patterns and insights.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>3</Typography>
                <Typography variant="h6" gutterBottom>Get Insights</Typography>
                <Typography variant="body2" color="text.secondary">
                  Chat with AI to get summaries, estimates, and recommendations. Export reports and share with your team.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to Transform Your Requirements Gathering?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of teams who are already saving time and improving accuracy with AI-powered requirements gathering.
            </Typography>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Start Your Free Trial
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
