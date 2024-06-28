"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Tree, { RawNodeDatum, CustomNodeElementProps } from "react-d3-tree";
import './tooltip.css'; // Import the CSS file for the tooltip
import './d3map.css'; // Import the CSS file for the D3 map
import { useGetJsonDataQuery } from "@/services/csvService";

interface CustomNodeDatum extends RawNodeDatum {
    attributes?: Record<string, string | number | boolean>;
}

export default function D3Map() {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const { data: jsonData, error, isLoading } = useGetJsonDataQuery();
    const [selectedTreeIndex, setSelectedTreeIndex] = useState(0);
    const [orgChart, setOrgChart] = useState<CustomNodeDatum>();

    const jsonDataDefault = {
        "J+1": [
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "10:00",
                "Titre": "TVB",
                "Libelle": "Hopital xxxxxxxx : Suite à votre intervention, si tout va bien repondez TVB, sinon repondez AID",
                "Alerte": "TVB Mais\r\n",
                "Action": "TVB-> coordonnees\r\nAID-> Complications et Douleur 1\r\nNon Reponse (3 H)-> Relance",
                "Entite à enregistrer": "TVB, AID, TVB mais, autre reponse",
                "Nb caracteres": 95.0,
                "Nb SMS": "  0,59   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "Reponse TVB à TVB ou à Relance",
                "Titre": "Coordonnees",
                "Libelle": "Merci de votre reponse. Pour toute question ou probleme vous pouvez nous appeler au 00 00 00 00 00 de hh:mm à hh:mm",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "",
                "Nb caracteres": 115.0,
                "Nb SMS": "  0,72   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "Non reponse (03 H) à TVB",
                "Titre": "Relance",
                "Libelle": "Vous n'avez pas repondu, si tout va bien repondez TVB, sinon repondez AID",
                "Alerte": "TVB Mais\r\nNon reponse (1H), non remis, ",
                "Action": "TVB-> coordonnees\r\nAID-> Douleur et Complications",
                "Entite à enregistrer": "TVB, AID, TVB mais, autre reponse, NR, non remis",
                "Nb caracteres": 73.0,
                "Nb SMS": "  0,46   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "AID à TVB ou à Relance",
                "Titre": "Complications",
                "Libelle": "En cas de nausees ou de vomissements, repondez NVO. Si vous avez un saignement important, repondez SNG. Si vous avez un autre probleme medical, repondez AUT",
                "Alerte": "NVO, SNG, AUT, alerte inattendue\r\nNon Reponse (2H)",
                "Action": ">3   -> douleur 2 ",
                "Entite à enregistrer": "NVO, SNG, AUT, alerte inattendue, TVB",
                "Nb caracteres": 156.0,
                "Nb SMS": "  0,98   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "AID à TVB ou à Relance",
                "Titre": "Douleur 1",
                "Libelle": "Evaluez votre douleur sur une echelle de 0 à 10 (0 : pas de douleur ; 10 : douleur insupportable)",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "",
                "Nb caracteres": 97.0,
                "Nb SMS": "  0,61   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "Reponse à douleur1 : >3",
                "Titre": "Douleur 2",
                "Libelle": "Si vous avez pris votre traitement anti-douleur repondez PRIS, sinon prenez-le maintenant et renvoyez une evaluation de votre douleur dans 45 min",
                "Alerte": "PRIS, >3,\r\nNVO, SNG, AUT, alerte inattendue",
                "Action": "Non Reponse (1H)-> douleur 3",
                "Entite à enregistrer": "Valeur douleur entre 0 et 10, PRIS",
                "Nb caracteres": 145.0,
                "Nb SMS": "  0,91   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "Non Reponse (1H° à douleur 2",
                "Titre": "Douleur 3",
                "Libelle": "Vous n'avez pas repondu au dernier message, evaluez maintenant votre douleur sur une echelle de 0 à 10 (0 : pas de douleur ; 10 : douleur insupportable)",
                "Alerte": ">3,\r\nNon Reponse (30min)",
                "Action": "",
                "Entite à enregistrer": "Valeur douleur entre 0 et 10 , PRIS",
                "Nb caracteres": 152.0,
                "Nb SMS": "  0,95   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J+1",
                "Menu": "Suivi",
                "Heure / condition": "18:00",
                "Titre": "Satisfaction",
                "Libelle": "Hopital xxxxxxxx : Evaluez votre passage au ************ sur une echelle de 0 à 10 (0 : pas du tout satisfait / 10 : extrêmement satisfait)",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "Valeur satisfaction entre 0 et 10 ",
                "Nb caracteres": 139.0,
                "Nb SMS": "  0,87   ",
                "Nb SMS entier": "  1,00   "
            }
        ],
        "J-1": [
            {
                "Date": "J-1",
                "Menu": "Horaires/\r\nConsignes",
                "Heure / condition": "16:00",
                "Titre": "Heure",
                "Libelle": "Hopital xxxxxxxxxxxx : Nous vous attendons à l'unite de chirurgie ambulatoire du batiment YYYY, Ze etage le JJ/MM/AA à hh:mm Un accompagnant est obligatoire pour votre sortie et la 1re nuit post-operatoire.\r\nSi vous avez un empechement ou un probleme de sante, repondez ALERTE",
                "Alerte": "Alerte, autre reponses",
                "Action": "",
                "Entite à enregistrer": "reponse innattendue, non remis, alerte",
                "Nb caracteres": 275.0,
                "Nb SMS": "  1,80   ",
                "Nb SMS entier": "  2,00   "
            },
            {
                "Date": "J-1",
                "Menu": "Horaires/\r\nConsignes",
                "Heure / condition": "16:02",
                "Titre": "Jeûne",
                "Libelle": "Ne pas manger, ne pas fumer, ne pas boire à partir de hh:mm. Sont seuls autorises l'eau, le cafe ou le the sucre sans lait jusqu'à hh:mm",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "",
                "Nb caracteres": 136.0,
                "Nb SMS": "  0,85   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J-1",
                "Menu": "Horaires/\r\nConsignes",
                "Heure / condition": "16:02",
                "Titre": "Hygiene",
                "Libelle": "Prenez une douche la veille et le matin de l'intervention. Ne mettez ni bijoux, ni piercing, ni vernis à ongles, ni maquillage",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "",
                "Nb caracteres": 126.0,
                "Nb SMS": "  0,79   ",
                "Nb SMS entier": "  1,00   "
            },
            {
                "Date": "J-1",
                "Menu": "Horaires/\r\nConsignes",
                "Heure / condition": "16:02",
                "Titre": "Documents",
                "Libelle": "Apportez vos radios et examens. N'oubliez pas le consentement eclaire signe ou la fiche d'information. Prenez vos medicaments selon les consignes recues",
                "Alerte": "",
                "Action": "",
                "Entite à enregistrer": "",
                "Nb caracteres": 152.0,
                "Nb SMS": "  0,95   ",
                "Nb SMS entier": "  1,00   "
            }
        ],
        "J-2": [
            {
                "Date": "J-2",
                "Menu": "Rappel/empêchement",
                "Heure / condition": "10:00",
                "Titre": "Rappel",
                "Libelle": "Hopital xxxxxxxxxxxx : votre operation est prevue le JJ/MM/AA. Nous vous enverrons l'heure de convocation la veille vers HH.\r\nUn accompagnant est obligatoire pour votre sortie et la 1re nuit post-operatoire.\r\nSi vous avez un empechement ou un probleme de sante, repondez ALERTE",
                "Alerte": "Alerte, autre reponses",
                "Action": "",
                "Entite à enregistrer": "ALERTE, reponse inattendue",
                "Nb caracteres": 275.0,
                "Nb SMS": "  1,80   ",
                "Nb SMS entier": "  2,00   "
            }
        ]
    };

    const transformData = (data: any): CustomNodeDatum => {
        const root: CustomNodeDatum = { name: 'Tree', children: [] };

        for (const [date, items] of Object.entries(data)) {
            const dateNode: CustomNodeDatum = {
                name: date,
                children: (items as any[]).map((item: any) => ({
                    name: item.Titre,
                    attributes: {
                        Date: item.Date,
                        Menu: item.Menu,
                        "Heure / condition": item["Heure / condition"],
                        Libelle: item.Libelle,
                        Alerte: item.Alerte,
                        Action: item.Action,
                        "Entite à enregistrer": item["Entite à enregistrer"],
                        "Nb caracteres": item["Nb caracteres"],
                        "Nb SMS": item["Nb SMS"],
                        "Nb SMS entier": item["Nb SMS entier"]
                    }
                }))
            };
            root.children?.push(dateNode);
        }

        return root;
    };

    useEffect(() => {
        const dataToTransform = jsonData && jsonData.length > 0 ? jsonData[selectedTreeIndex].data : jsonDataDefault;
        setOrgChart(transformData(dataToTransform));
    }, [jsonData, selectedTreeIndex]);

    const showTooltip = (text: string, x: number, y: number) => {
        if (tooltipRef.current) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.style.left = `${x}px`;
            tooltipRef.current.style.top = `${y}px`;
            tooltipRef.current.textContent = text;
        }
    };

    const hideTooltip = () => {
        if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
        }
    };

    const renderCustomNode = useCallback(({ nodeDatum, toggleNode }: CustomNodeElementProps) => (
        <g>
            <circle r="15" onClick={toggleNode} fill="#FF6F01"></circle>
            <foreignObject x="-60" y="-50" width="100" height="500">
                <div
                    className="node-text"
                    onMouseOver={(event) => showTooltip(nodeDatum.name, event.clientX, event.clientY)}
                    onMouseOut={hideTooltip}
                >
                    {nodeDatum.name.length > 10 ? nodeDatum.name.slice(0, 10) + "..." : nodeDatum.name}
                </div>
            </foreignObject>
            {nodeDatum.attributes && Object.entries(nodeDatum.attributes).map(([key, value], i) => {
                const textValue = `${key}: ${value}`;
                return (
                    <foreignObject key={key} x="-50" y={20 * (i + 1)} width="120" height="500">
                        <div
                            className="node-text"
                            onMouseOver={(event) => showTooltip(textValue, event.clientX, event.clientY)}
                            onMouseOut={hideTooltip}
                        >
                            {textValue.length > 15 ? textValue.slice(0, 15) + "..." : textValue}
                        </div>
                    </foreignObject>
                );
            })}
        </g>
    ), []);

    return (
        <div className="bg-white w-screen overflow-scroll">
            <div className="bg-primary text-black">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error loading data</p>}
                
                <select onChange={(e) => setSelectedTreeIndex(Number(e.target.value))} disabled={isLoading || !jsonData} className="bg-primary rounded min-w-32 p-4">
                    {jsonData && jsonData.map((_: any, index: any) => (
                        <option key={index} value={index} className="text-black">
                            Tree {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div ref={tooltipRef} className="tooltip" />
            {orgChart && (
                <Tree
                    data={orgChart}
                    draggable={true}
                    translate={{ x: 600, y: 60 }}
                    orientation="vertical"
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                    renderCustomNodeElement={renderCustomNode}
                    zoomable
                    scaleExtent={{ min: 0.1, max: 2 }}
                />
            )}
        </div>
    );
}
