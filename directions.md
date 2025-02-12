# AI-Powered Document Analysis Platform

## Project Overview
We're rebuilding our document analysis platform using the Nuxt ecosystem to create a more maintainable and easily deployable solution. The platform enables users to analyze multiple documents simultaneously using different AI personas for varied analytical perspectives.

## Core Requirements

### 1. Document Management
- Support for multiple document types:
  - Required: PDF, DOCX, Google Docs, TXT
  - Stretch Goals: 
    - Image files
    - Spreadsheets (CSV, XLSX)
    - Google Drive integration for direct file selection

### 2. Deal Room Architecture
- Transform the existing thread concept into "Deal Rooms"
- Each Deal Room supports:
  - Multiple document uploads (minimum 5)
  - Customizable system prompts
  - Persistent conversation history
  - Citation tracking

### 3. Analysis Personas
Implement three distinct AI personas with specialized system prompts:
1. Financial Analyst (10x Underwriter)
   - Focus on financial metrics and analysis
   - Risk assessment capabilities
   
2. Legal & Operations (Risk Checker)
   - Legal compliance analysis
   - Operational risk assessment
   
3. General Advisor (Sounding Board)
   - Open-ended discussion
   - Strategic insights

### 4. Technical Stack
- Base Template: Nuxt Hub's "Chat with PDF" template
- Backend: Node.js with Express
- Database: PostgreSQL with Drizzle ORM
- Deployment: Cloudflare (one-click deployment via Nuxt Hub)

## Getting Started

### Prerequisites
1. Cloudflare account with API token
2. GitHub account for deployment
3. Node.js and npm installed locally

### Development Setup
1. Clone the base template:
```bash
# Repository URL will be provided
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
CLOUDFLARE_API_TOKEN=your_token_here
# Additional environment variables will be documented
```

### Deployment
1. Fork the repository to your GitHub account
2. Connect to Nuxt Hub
3. Authorize with Cloudflare
4. Select your team/personal account
5. Deploy

## Key Features to Implement

### Document Processing
- Implement file type detection and validation
- Create document preview functionality
- Enable multiple document upload handling
- Implement citation tracking system

### Deal Room Management
- Create deal room creation/management interface
- Implement system prompt selection UI
- Build document association system
- Develop conversation history tracking

### User Interface
- Design persona selection interface
- Create document upload/management UI
- Implement citation display system
- Build conversation thread visualization

## API Structure

### Document Management
```typescript
interface Document {
  id: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx';
  content: string;
  metadata: {
    filename: string;
    uploadDate: Date;
    size: number;
  };
}
```

### Deal Room
```typescript
interface DealRoom {
  id: string;
  name: string;
  documents: Document[];
  systemPrompt: SystemPrompt;
  conversations: Conversation[];
  created: Date;
  updated: Date;
}
```

### System Prompts
```typescript
interface SystemPrompt {
  id: string;
  type: 'financial' | 'legal' | 'general';
  content: string;
  metadata: {
    name: string;
    description: string;
  };
}
```

## Success Criteria
1. Successfully deploy via Nuxt Hub
2. Support multiple document types
3. Implement all three AI personas
4. Enable citation tracking
5. Create intuitive document management interface
6. Ensure smooth conversation flow with appropriate context

## Timeline
- Phase 1 (Week 1): Basic setup and document handling
- Phase 2 (Week 1-2): Deal room implementation
- Phase 3 (Week 2): AI persona integration
- Phase 4 (Week 2-3): UI/UX implementation
- Phase 5 (Week 3): Testing and deployment

## Evaluation Criteria
1. Code Quality
   - Clean, maintainable code
   - Proper TypeScript usage
   - Comprehensive error handling

2. Feature Completeness
   - All core features implemented
   - Stretch goals attempted

3. User Experience
   - Intuitive interface
   - Smooth document handling
   - Clear conversation flow

4. Technical Implementation
   - Proper use of Nuxt ecosystem
   - Efficient database design
   - Scalable architecture

## Resources
- Nuxt Hub Documentation: [URL to be provided]
- Base Template Repository: [URL to be provided]
- Cloudflare Workers Documentation: [URL to be provided]

## Support
For technical questions or clarification, please:
1. Create an issue in the repository
2. Tag it appropriately
3. Provide relevant context and screenshots

## Next Steps
1. Review this documentation thoroughly
2. Set up local development environment
3. Fork the base template
4. Begin implementation following the suggested timeline

Good luck with the implementation! We're excited to see your approach to this challenge.
