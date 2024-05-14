import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharactersByHero = ({ alter_ego, characters }) => {
    return (alter_ego === characters)
        ? <></>
        : <p>{characters}</p>;
}

export const HeroCard = ({ hero }) => {

    const heroImgUrl = `/assets/heroes/${hero.id}.jpg`;

    return (
        <div className='col animate__animated animate__fadeIn'>
            <div className="card">

                <div className="row no-guitters">
                    <div className="col-4">
                        <img src={heroImgUrl} alt={hero.superhero} className="card-img" />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className='card-title'>{hero.superhero}</h5>
                            <p className='card-text'> {hero.alter_ego} </p>

                            <CharactersByHero alter_ego={hero.alter_ego} characters={hero.characters} />

                            <p className='card-text'>
                                <small className='text-muted'>{hero.first_appearance}</small>
                            </p>

                            <Link to={`/hero/${hero.id}`}> Más información </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

HeroCard.propTypes = {
    hero: PropTypes.object.isRequired
}

CharactersByHero.propTypes = {
    alter_ego: PropTypes.string.isRequired,
    characters: PropTypes.string.isRequired,
}