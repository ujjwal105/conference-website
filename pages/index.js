/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import Header from '../components/Header/header';
import Venue from '../components/Venue/venue';
import speakers from '../config/speakers.json';
import ReactSlider from '../components/Slider/slider';
import Speaker from '../components/Speaker/speaker';
import Sponsors from '../components/Sponsors/sponsors';
import Subcription from '../components/Form/subscription';
import About from '../components/About/about';
import Heading from '../components/Typography/heading';
import Paragraph from '../components/Typography/paragraph';
import Button from '../components/Buttons/button';
import { useMediaQuery } from 'react-responsive';
import Dropdown from '../components/Dropdown/dropdown';
import cities from '../config/city-lists.json';

export default function Home() {
	const [city, setCity] = useState("");
	const isTablet = useMediaQuery({ maxWidth: '1118px' });
	const [speakersList, setSpeakersList] = useState([]);
	if (typeof window !== 'undefined') {
		TagManager.initialize({ gtmId: 'GTM-MCT2H5G' });
		ReactGA.initialize('UA-109278936-3');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	useEffect(() => {
		const newArr = []
		speakers.map((speaker) => {
			if (Array.isArray(speaker.lists) && Object.keys(speaker.lists).length > 0) {
				newArr.push(...speaker.lists)
			}
		});
		setSpeakersList(newArr)
	},[])
	return (
		<div>
			<Head>
				<title>AsyncAPI Conference</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<div id='about'>
				<About />
			</div>
			<div id='venues'>
				<div className='gradient-bg w-full container flex flex-col justify-center items-center'>
					<div className='w-[1130px] lg:w-full flex lg:py-20 flex-col items-center justify-center'>
						<div className='text-center py-[46px] w-[714px] lg:w-full'>
							<Heading className='text-white'>Venues</Heading>
							<Paragraph className='mt-12'>
								The AsyncAPI Conf2023 on Tour is planned to take the online
								event to the next level by hosting physical events in five
								different locations across the globe.
							</Paragraph>
						</div>
						<div className='w-full mt-[64px]'>
							<ReactSlider>
								{cities.map((city) => {
									return <Venue key={city.name} city={city} />;
								})}
							</ReactSlider>
						</div>
					</div>
				</div>

				<div
					id='speakers'
					className='pt-[160px] container relative flex flex-col items-center justify-center'
				>
					<div className='lg:py-20 w-[1130px] lg:w-full'>
						<div className='text-center'>
							<Heading className='text-white'>Speakers</Heading>
							<Paragraph className='mt-[20px]'>Meet the speakers</Paragraph>
						</div>
						<div className='mt-[64px] '>
							{isTablet ? (
								<div className='w-full'>
									<Dropdown
										active={city.city}
										items={speakers}
										setOptions={setCity}
										setOptions2={setSpeakersList}
									/>
								</div>
							) : (
								<div className='flex justify-center'>
									<div className='w-[720px] lg:w-full flex justify-between'>
										{speakers.map((speaker) => {
											return (
												<div
													key={speaker.location}
													onClick={() => {
														setCity(speaker);
														setSpeakersList(speaker.lists);
													}}
												>
													<Button
														className={`w-[168px] ${
															city.city === speaker.city
																? 'gradient-bg'
																: 'border border-gray'
														}`}
														overlay={true}
													>
														{speaker.city}
													</Button>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>

						<div className='mt-[64px] pb-[181px]'>
							{typeof speakersList === 'string' ? (
								<div className='mt-[140px] flex items-center justify-center text-center'>
									<div className='w-[720px] lg:w-full'>
										<Heading className='text-white'>
											{city.city} Speakers To Be Announced Soon - Stay Tuned!
										</Heading>
									</div>
								</div>
							) : Object.keys(speakersList).length > 0 ? (
								<div className='w-full grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4'>
									{speakersList.map((speaker, i) => {
										return (
											<Speaker
												key={i}
												details={speaker}
												location={city}
												className='mt-10'
											/>
										);
									})}
								</div>
							) : (
								<div className='mt-[140px] flex items-center justify-center text-center'>
									<div className='w-[720px] lg:w-full'>
										<Heading className='text-white'>
											{city.city} Speakers Coming Soon - Stay Tuned!
										</Heading>
										<Paragraph className='mt-12'>
											We are actively accepting speaker applications, and you
											can start your journey by clicking the button below. Join
											us on stage and share your valuable insights with our
											enthusiastic audience!
										</Paragraph>
										<Button className='mt-[80px] w-[244px] border border-gray card-bg'>
											Apply as a Speaker
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div id='sponsors'>
					<Sponsors imgs={['/img/sngular.png', '/img/IBM.png', '/img/postman.png']} />
				</div>
				<div className=''>
					<Subcription />
				</div>
			</div>
		</div>
	);
}
