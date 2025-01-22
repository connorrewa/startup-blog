import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://a9562f4a6c41b79604a53ac43eb71699@o4508650710958080.ingest.us.sentry.io/4508650713382912',

    integrations: [
        Sentry.replayIntegration(),
        Sentry.feedbackIntegration({
            colorScheme: 'system',
            customStyles: {
                button: {
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: '9999', // Ensure the button appears above other elements
                },
            },
        }),
    ],

    // Define sampling rates for tracing and replays
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    debug: false,
});
