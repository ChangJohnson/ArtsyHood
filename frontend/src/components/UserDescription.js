import React from 'react';
import styled from 'styled-components';

function UserDescription() {
  return (
    <Wrapper>
      <Flex>
        <DivImg>
          <Img src={window.location.origin + '/PrzemekPyszczek.jpeg'}></Img>
        </DivImg>
        <DivDescription>
          <ArtistName>Przemek Pyszczek</ArtistName>
          <div>
            Przemek Pyszczek’s studio may only be a 20-minute ride on the train
            from Berlin’s Alexanderplatz, midway along a line most frequented by
            the Easy Jet-set on their way back and forth from Schönefeld Airport
            for sleepless weekends of bad drugs and great music. But the
            kilometer-long stretch of warehouses in Schöneweide which used to
            house East Berlin’s most important power station and now, in part,
            Pyszczek’s sundrenched atelier is a Berlin those hoards—and, for
            that matter, most of those who populate the city’s increasingly
            booming city center—rarely see.
          </div>
        </DivDescription>
      </Flex>
      <Flex>
        <DivImg>
          <Img src={window.location.origin + '/KateCooper.jpeg'}></Img>
        </DivImg>
        <DivDescription>
          <ArtistName>Kate Cooper</ArtistName>

          <div>
            Is art the creation of a single person or really the result of
            collaboration, conversation, and work from multiple individuals?
            This is one of the central questions at the crux of the work of
            young British artist Kate Cooper. Cooper first made her name as part
            of Auto Italia South East, an artist-run space founded in south
            London that has, over time, evolved into an artist collective.
            During the eight years of its existence, Auto Italia’s exhibitions,
            events, and performative works projects have often been politically
            charged. Their conversational and performative works have examined
            issues around labor, creation, and experience in and outside of art
            production. Cooper’s own pieces outside of Auto Italia also address
            some of those same themes: capitalism and commercialism, in
            particular.
          </div>
        </DivDescription>
      </Flex>
      <Flex>
        <DivImg>
          <Img src={window.location.origin + '/ClaraIanni.jpeg'}></Img>
        </DivImg>
        <DivDescription>
          <ArtistName>Clara Ianni</ArtistName>
          <div>
            There is a certain silence in the work of Clara Ianni—not a still,
            removed kind of silence, but a rather tense one, like a pregnant
            pause before a storm erupts. Her work embodies a latent state of
            violence that creeps to the surface every now and with polished
            manners rather than aggression. We meet in a warehouse in the south
            side of São Paulo as night falls. She shares this space with a group
            of fellow artists whose works, or fragments of them, are strewn
            about the floor. Hers is a desk in the corner, on which sits a
            MacBook Air and nothing else. The sparse surroundings look like an
            old factory gutted and devoid of everything but a hard concrete
            floor and whitewashed walls. They match her work—bold and brash in
            content, understated in form. Still Life or Study for Vanishing
            Point was the first of her pieces to really strike me. Nine sheets
            of steel hang on the wall grouped in three parallel rows, three
            plaques in each of them, forming a grid.”{' '}
          </div>
        </DivDescription>
      </Flex>
    </Wrapper>
  );
}

const ArtistName = styled.div`
  margin-bottom: 15px;
  font-size: 35px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;
  padding-left: 65px;
  padding-bottom: 200px;
`;
const Flex = styled.div`
  display: flex;
  margin-bottom: 75px;
`;

const DivImg = styled.div``;

const DivDescription = styled.div`
  font-size: 25px;
  font-family: Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 65px;
  max-width: 1000px;
`;

const Img = styled.img`
  width: 300px;
  height: 350px;
  object-fit: cover;
  border-radius: 7%;
`;

export default UserDescription;
