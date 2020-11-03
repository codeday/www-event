import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { print } from 'graphql';
import Text, { Link, Heading } from '@codeday/topo/Atom/Text';
import MailingListSubscribe from '@codeday/topo/Organism/MailingListSubscribe';
import Content from '@codeday/topo/Molecule/Content';
import { apiFetch } from '@codeday/topo/utils'
import Page from '../../components/Page';
import { IndexStaticPathsQuery, IndexStaticPropsQuery } from './index.gql';

export default function EventHome({ webname, region }) {
  // Redirect the user to the canonical URL
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined' || !region) return;
    console.log(region.webname, webname);
    if (webname !== region.webname) {
      router.replace(`/${region.webname}`, `/${region.webname}`, { shallow: true });
    }
  }, [typeof window, webname, region]);

  // Show a 404 if the region doesn't exist
  if (!region) {
    return (
      <Page slug={`/${webname}`}>
        <Content>
          <Heading as="h2" fontSize="5xl" textAlign="center">Sorry, we couldn't find that CodeDay.</Heading>
        </Content>
      </Page>
    );
  }

	return (
		<Page slug={`/${region.webname}`} region={region}>
			<Content maxWidth="containers.sm" mb={16}>
        <Heading as="h2" fontSize="5xl" textAlign="center" mb={8}>CodeDay {region.name}</Heading>
        <Text>
          CodeDay is a worldwide event where student programmers, artists, musicians, actors, and everyone else can
          get together and build apps & games for 24 hours. Students of all skill levels are welcome — we have workshops
          and mentors who can help if you're new!
        </Text>
        <Text color="red.800" bold>
          Our in-person CodeDays are on hold until it's safe to host them again. In the meantime, check out{' '}
          <Link href="https://virtual.codeday.org/">Virtual CodeDay</Link> or enter your email below to get
          notified when we re-open registrations.
        </Text>
        <MailingListSubscribe emailList="oe1GazGggJqSDv0892QivA1g" />
			</Content>
		</Page>
	)
}

export async function getStaticPaths() {
  const allRegions = await apiFetch(print(IndexStaticPathsQuery));
  const allWebnames = allRegions?.cms?.regions?.items
    .reduce((accum, r) => [...accum, r.webname, ...(r.aliases || [])], []) || [];

  return {
    paths: allWebnames.map((webname) => ({ params: { webname } })),
    fallback: true,
  }
}

export async function getStaticProps({ params: { webname } }) {
  const result = await apiFetch(print(IndexStaticPropsQuery), { webname });
  return {
    props: {
      webname,
      region: result?.cms?.regions?.items[0] || null,
    },
    revalidate: 900,
  }
}
