import React from 'react';
import { HeadFC, PageProps } from 'gatsby';

import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from '../styles/SponsorsPage.module.css';

interface TierProps {
	tierName: string;
	nodes: Queries.SponsorsQuery['allContentfulSponsor']['nodes'];
	titleComponent: 'h2' | 'h4' | 'p';
}

const Tier: React.FC<TierProps> = ({ tierName, nodes, titleComponent }) =>
	nodes.find((node) => node.tier === tierName) !== undefined ? (
		<div className={styles.tier}>
			<style>
			@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200&display=swap');

			</style>
			<h3>{tierName}</h3>
			<div className={`${styles.sponsors} ${tierName in styles ? styles[tierName] : ''}`}>
				{nodes
					.filter((node) => node.tier === tierName)
					.map((node) => {
						if (node.logo !== null && node.logo?.gatsbyImageData !== null)
							return (
								<GatsbyImage
									image={node.logo?.gatsbyImageData!}
									alt={node.name!}
									title={node.name!}
									className={styles.image}
									objectFit="contain"
								/>
							);
						if (node.logo !== null && node.logo?.url !== null)
							return (
								<img
									src={node.logo?.url!}
									alt={node.name!}
									title={node.name!}
									className={styles.image}
								/>
							);
						if (titleComponent === 'h2') return <h2>{node.name}</h2>;
						if (titleComponent === 'h4') return <h4>{node.name}</h4>;
						if (titleComponent === 'p') return <p>{node.name}</p>;
					})}
			</div>
		</div>
	) : null;

export const SponsorsPage: React.FC<PageProps<Queries.SponsorsQuery>> = ({ data, location }) => {
	const { nodes } = data.allContentfulSponsor;
	console.log(nodes);
	return (
		<>
			<style>
			@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200&display=swap');

			</style>
			<center><h1>Sponsors</h1></center>
			<div className={styles.tiers}>
				<Tier nodes={nodes} tierName="Platinum" titleComponent="h2" />
				<Tier nodes={nodes} tierName="Gold" titleComponent="h4" />
				<Tier nodes={nodes} tierName="Silver" titleComponent="p" />
				<Tier nodes={nodes} tierName="Bronze" titleComponent="p" />
			</div>
		</>
	);
};

export const Head: HeadFC<Queries.SponsorsQuery> = () => <title>Sponsors | Antares</title>;

