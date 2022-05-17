import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ pageTitle, type }) => {

    const meta = {
        url: 'https://teamapt-landing.co/',
        title: 'TMP',
        description: 'TeamApt Landing Page',
        language: "en-US",
        image: 'https://storage.googleapis.com/concreap-buckets/xpc-seo.png',
        author: {
            email: `landing.co`,
            name: 'TeamApt',
            image:'https://storage.googleapis.com/concreap-buckets/xpc-seo.png'
        },
        site: {
            siteName: 'TeamApt Landing',
            searchUrl: 'https://www.google.com/search?q=xpresschain'
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"></meta>
                <title>{ type === 'main' ? meta.title + ' - ' + meta.description : !type ? 'TeamApt Landing' : pageTitle}</title>
                <meta name="description" content={meta.description}></meta>
                <meta name="keywords" content="talent, app"></meta>

                <meta itemprop="description" content={meta.description}></meta>
                <meta itemprop="image" content={meta.image}></meta>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@landing" />
                <meta name="twitter:creator" content="@landing" />
                <meta name="twitter:title" content="TeamApt Landing Page"/>
                <meta name="twitter:description" content={meta.description}/>
                <meta name="twitter:image" content={meta.image}/>

                <meta property="og:site_name" content={meta.url} />
                <meta property="og:title" content="TeamApt Landing Page"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="og:url" content={meta.url} />
            </Helmet>
        </>
    )
}

export default SEO
