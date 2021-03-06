import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

import Layout from 'gatsby-theme-dromedar/src/components/layout'
import SEO from 'gatsby-theme-dromedar/src/utils/seo'
import Body from '../components/body'
import useOnLoad from '../utils/useOnLoad'
import Logo from "../components/logo";

export default ({ data }) => {
    const { page } = data.prismic;

    if (null === page) {
        if (typeof window !== 'undefined') {
            window.location.href = '/404'
        }

        return null
    }

    const logo = useOnLoad({
        initial: {
            transform: 'translateY(calc(50vh - 50%)) scale(2)',
        },
        onLoad: {},
        delay: 1650,
    });

    const c1 = useOnLoad({
        initial: {
            background: 'white',
        },
        onLoad: {
            background: 'transparent',
        },
        delay: 2050,
    });

    const c2 = useOnLoad({
        initial: {
            height: '100vh',
        },
        onLoad: {
            height: 100,
            background: 'rgba(255, 255, 255, .9)',
        },
        delay: 2100,
    });

    const title = RichText.asText(page.title || [])
    const description = RichText.asText(page.description || [])
    const image = page.image && page.image.url

    return <Layout>
        <SEO
            titleTemplate="%s"
            title={title}
            description={description}
            image={image}
        >
            <link href="https://fonts.googleapis.com/css?family=Rokkitt:400,700|Rubik:400,500&display=swap" rel="stylesheet" />
        </SEO>

        <div style={{
            transition: 'background ease .4s',
            ...c1,
            ...c2,
        }} className="fixed z-50 w-screen top-0 flex items-start justify-center">
            <div style={{
                transition: 'top ease .4s, transform ease .4s',
                ...logo,
            }} className="absolute dd-center"><Logo /></div>
        </div>

        <div style={{
            marginTop: 120,
            minHeight: 'calc(100vh - 120px)',
        }} className="dd-wrapper pb-8">
            <div className="max-w-2xl mx-auto px-4 md:px-8 pb-4 sm:pb-16">
                <div className="mb-12">
                    <h1 className="dd-h1 w-64 sm:w-auto">{title}</h1>
                    <p className="dd-title mt-4 text-lg text-gray-600 tracking-wide">{description}</p>
                    <hr className="mt-6" />
                </div>
                <div>
                    <Body body={page.body} />
                </div>
            </div>
        </div>
    </Layout >
}

export const query = graphql`
{
    prismic {
        page(uid: "workshop", lang: "hu") {
            title
            description
            image
            _meta {
                type
                uid
            }
            body {
                ... on PRISMIC_PageBodyContent {
                    type
                    primary {
                        content
                    }
                }
                ... on PRISMIC_PageBodyHighlight {
                    type
                    primary {
                        text
                        content
                    }
                }
                ... on PRISMIC_PageBodyForm {
                    type
                    primary {
                        form_name
                        form_title
                        text
                    }
                }
                ... on PRISMIC_PageBodyCard {
                    type
                    primary {
                        name
                        text
                        profile_image
                        profile_imageSharp {
                            childImageSharp {
                                fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
                ... on PRISMIC_PageBodyImage {
                    type
                    primary {
                        image
                        imageSharp {
                            childImageSharp {
                                fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        caption
                    }
                }
            }
        }
    }
}
`
