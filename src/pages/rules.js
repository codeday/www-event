import React from 'react';
import { Heading, Link, Text } from '@codeday/topo/Atom';
import { CognitoForm, Content, GithubAuthors } from '@codeday/topo/Molecule';
import { useAnalytics } from '@codeday/topo/utils';
import Page from '../components/Page';

export default function Rules() {
  return (
    <Page darkHeader={false} title="Rules">
      <Content mb={6} mt={-12}>
        <GithubAuthors repository="www-event" path="src/pages/rules.js" />
      </Content>
      <Content maxW="container.md">
        <Heading mb={6} as="h2" fontSize="4xl">CodeDay Event Rules (CDER)</Heading>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER0. Incidentals to participation.</Heading>
        <Text mb={2}>
          You acknowledge that you are solely responsible for any costs incurred in connection with your participation
          in the event, including without limitation, travel, accommodations, supplies, and use of personal devices.
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER1. Waivers and releases.</Heading>
        <Text mb={2}>
          In consideration for participating in CodeDay, you (or, if you are a minor, your parent or legal guardian)
          must sign both waivers and other releases.
        </Text>
        <Text mb={2}>
          You will be required to sign a liability waiver.
        </Text>
        <Text mb={2}>
          You will be required to agree that (a) you, your bags, and your other personal property are
          all subject to screening, search, and other security checks at any time during CodeDay; (b) CodeDay reserves
          the right to prevent any property from entry into the event; and (c) all personal property is brought at your
          own risk, and you are responsible for safeguarding it.
        </Text>
        <Text mb={2}>
          You will be required to sign a media release which allows us to, among other things, take photos and
          recordings of you and your projects.
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER2. You own the rights.</Heading>
        <Text mb={2}>
          Notwithstanding the previous section, you and your team members own all the rights to everything you create at
          CodeDay. If you work with a team and expect to release an app or game, you should be clear about who owns what
          rights.
        </Text>
        <Text>
          Unless your team agrees in advance, you agree to split ownership equally between all team members. (A "team
          member" means anyone who made any contribution to your project, except for CodeDay-designated staff, mentors,
          and volunteers.)
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER3. Eligible attendees.</Heading>
        <Text mb={2}>
          Most CodeDay events have age or other limits which affect which students may participate. During the
          registration process, you are required to provide the accurate age of all attendees as of the start of
          CodeDay, so our system can make a determination as to your eligibility to attend.
        </Text>
        <Text>
          You certify that all information you provide in your registration is accurate, and that you meet all
          eligibility requirements documented on the registration form. CodeDay reserves the right to verify your
          eligibility. If you provide an inaccurate age or otherwise do not meet the eligibility requirements
          documented on the registration form, you will be refused entry or removed from the event without a refund.
        </Text>
        <Text mb={2}>
          Teachers may attend with students without a ticket, but must show proof of their status when checking in.
          Schools which want to send chaperones should contact us at least one week in advance; chaperones may be
          required to undergo a background check unless the school has already conducted one.
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER4. Minors.</Heading>
        <Text mb={2}>
          Minors must be mature enough to behave safely in a self-directed event without constant supervision. Parents
          or guardians certify that they have had a conversation with each minor about their maturity and expectations
          for the event, and are satisfied the student can behave safely during the event.
        </Text>
        <Text mb={2}>
          During the event, minors may only leave the event if picked up by a parent or guardian, or if a parent or
          guardian authorizes their exit by phone or writing (sending the student with a written note is sufficient).
        </Text>
        <Text mb={2}>
          Unless permission to leave is given, <em>a parent or guardian must be available to pick up all minors
          throughout the event.</em>
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER5. Event Behavior.</Heading>
        <Text mb={2}>
          <strong>No excessive video gaming:</strong> CodeDay is a creative event, and is not designed for students
          who simply want to play existing video games. Other than scheduled CodeDay activities, participants observed
          playing video games will be asked to stop, and repeat offenders will be asked to leave.
        </Text>
        <Text mb={2}>
          <strong>Clean up after yourself:</strong> Don't make a mess, and clean up your space before you leave.
        </Text>
        <Text mb={2}>
          <strong>All teams must pitch:</strong> CodeDay is a community event. Teams formed before the event must pitch
          their idea during the pitches, and must be open to new members joining their team. Violating teams will be
          disqualified from all awards, and may be removed from the event.
        </Text>
        <Text mb={2}>
          <strong>Don't be disruptive:</strong> Attendees who are regularly disruptive to others may be removed from the
          event. This includes violations of our <Link href="https://www.codeday.org/conduct">Code of Conduct</Link> as
          well as any behavior which impairs the ability of others to participate in the event.
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER5. Awards.</Heading>
        <Text mb={2}>
          Awards will be decided either by judges or by the event staff. No attendee is allowed into the area where
          judges are discussing awards.
        </Text>
        <Text mb={2}>
          In order to be eligible for the <em>Best in Class</em> and <em>Best in Show</em> awards <strong>(but NOT
          required for <em>Special Prizes</em>),</strong> projects must comply with the following rules:
        </Text>
        <Text mb={2} ml={6}>
          a. A team must comprise 1-6 people who are registered CodeDay attendees. (However, attendees can be registered
          for any ongoing CodeDay event, and may be participating virtually.)
        </Text>
        <Text mb={2} ml={6}>
          b. Projects may use any generally available programming languages, tools, APIs, engines, frameworks, music,
          art, tutorials, or codebases &mdash; whether freely available or proprietary, and regardless of availability
          of source code. "Generally available" means it was available to, and discoverable by, the general public prior
          to the start of CodeDay; that any fee charged is reasonable and market-rate; and that it was not developed
          exclusively for your team's project.
        </Text>
        <Text mb={2} ml={6}>
          c. You must disclose all such resources your project uses (a) in discussion with the judges, (b) during your
          presentation, and (c) on your project's page on CodeDay Showcase.
        </Text>
        <Text mb={2} ml={6}>
          d. You can work on the concept for your project before the competition begins, including making notes,
          sketches mockups, database and inheritance diagrams, and storyboards, however you can not produce any
          production-ready content before the kickoff. This includes images, test cases, engines, sounds, and music.
        </Text>
        <Text mb={2} ml={6}>
          e. Except as provided above, all work on the project must occur by the team, between the end of the kickoff
          and the beginning of the presentations. (Commissioning paid work is forbidden.)
        </Text>


        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER6. Event staff have final say.</Heading>
        <Text mb={2}>
          The organizers will interpret all event rules and the Code of Conduct in understanding of the spirit.
          Organizers have the authority to disqualify you from any awards, remove you from the event, and have you
          banned from future events. If you're removed from the event, you will not receive a refund, and may need to
          call a parent to pick you up.
        </Text>

        <Heading mt={6} mb={2} as="h3" fontSize="2xl">CDER7. Bans.</Heading>
        <Text mb={2}>
          If you register for an event once you have been banned, you will not be allowed entry, and your ticket will
          not be refunded.
        </Text>
      </Content>
    </Page>
  );
}
