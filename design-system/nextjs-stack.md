## UI Pro Max Stack Guidelines
**Stack:** nextjs | **Query:** personal blog content creator
**Source:** stacks/nextjs.csv | **Found:** 3 results

### Result 1
- **Category:** Performance
- **Guideline:** Avoid layout shifts
- **Description:** Reserve space for dynamic content
- **Do:** Skeleton loaders aspect ratios
- **Don't:** Content popping in
- **Code Good:** <Skeleton className="h-48"/>
- **Code Bad:** No placeholder for async content
- **Severity:** High
- **Docs URL:** 

### Result 2
- **Category:** Security
- **Guideline:** Use CSP headers
- **Description:** Content Security Policy for XSS protection
- **Do:** Configure CSP in next.config.js
- **Don't:** No security headers
- **Code Good:** headers() with CSP
- **Code Bad:** No CSP configuration
- **Severity:** High
- **Docs URL:** https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy

### Result 3
- **Category:** Rendering
- **Guideline:** Use streaming for better UX
- **Description:** Stream content with Suspense boundaries
- **Do:** Suspense for slow data fetches
- **Don't:** Wait for all data before render
- **Code Good:** <Suspense><SlowComponent/></Suspense>
- **Code Bad:** await allData then render
- **Severity:** Medium
- **Docs URL:** https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

