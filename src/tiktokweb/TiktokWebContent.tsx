import React from "react";
import { Text, Grid, Badge, Table } from "@geist-ui/core";
import ImageComparison from "./ImageComparison";

const TiktokWebContent = () => {
  const tableData = [
    {
      category: "Scope & Content",
      col1: [
        "Foundation components",
        "Legacy component standard",
        "Core page design specs",
      ],
      col2: [
        "Bridge App feature gaps",
        "Improve content efficiency",
        "Boost consumption UX",
      ],
      col3: [
        "Web exclusive UX (Player, Auth, etc.)",
        "Leverage Web-native capabilities",
      ],
      col4: [
        "Load performance",
        "Recommendation UX",
      ],
    },
    {
      category: "Design Role",
      col1: "High",
      col2: "High",
      col3: "High",
      col4: "Minimal",
    },
    {
      category: "Value / Impact",
      col1: "Long-term value",
      col2: "High",
      col3: "High",
      col4: "high",
    },
  ];

  const renderList = (items: string[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {items.map((item, index) => (
        <div key={`${item}-${index}`}>
          • {item}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" 
        rel="stylesheet" 
      />
      
      <div 
        id="container" 
        style={{ 
          width: "100%", 
          maxWidth: "720px", 
          margin: "0 auto",
          fontFamily: "var(--font-tiktok)",
          display: "flex",
          flexDirection: "column",
          gap: "60px"
        }}
      >
        {/* Add your content here */}
        <Text h1 style={{ 
          fontFamily: '"Instrument Serif", serif', 
          fontSize: "36px", 
          lineHeight: 1.2,
          margin: 0,
          color: "var(--color-text-primary)",
        }}>
          Driving TikTok.com growth through continuous product iteration and data-driven insights.
        </Text>
        
        <Grid.Container gap={2} style={{ margin: 0 }}>
          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Role
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Sole Product designer{"\n"}Design Engineer
            </Text>
          </Grid>

          <Grid xs={12} direction="column" style={{ padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Credits
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Huiqiao Z. /Design manger{"\n"}Yiming M. Jason L. /PM
            </Text>
          </Grid>

          <Grid xs={24} direction="column" style={{ marginTop: "20px", padding: 0 }}>
            <Text span style={{ fontSize: "12px", textTransform: "uppercase", color: "#A0A0A0", lineHeight: 1.3 }}>
              Time
            </Text>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              2025 Q2 - Present
            </Text>
          </Grid>
        </Grid.Container>

        {/* Image Comparison Section */}
        <div style={{ width: "100%" }}>
          <ImageComparison 
            beforeImage="https://f004.backblazeb2.com/file/xiangyi-assets/Before.jpg"
            afterImage="https://f004.backblazeb2.com/file/xiangyi-assets/After.jpg"
          />
        </div>

        {/* Text Section After Image Comparison */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          width: "100%",
          alignItems: "start"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%"
          }}>
            <Text span style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.3 }}>
              There and here
            </Text>
            <Text span style={{ fontFamily: '"Instrument Serif", serif', fontSize: "22px", color: "var(--color-text-primary)", lineHeight: 1.1 }}>
              Blurring the boundaries
            </Text>
          </div>
          <div style={{ flex: 1 }}>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-primary)", lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
              Before I joined, the lean team prioritized rapid shipping over scalability, leaving a legacy of fragmented design assets, a visible quality gap relative to TikTok’s global brand, and UX flaws that undermined conversion.{"\n\n"}Upon joining, I took full end-to-end ownership—bridging PM, Design, and Engineering—to formalize design standards and technical rules, successfully closing the quality gap and elevating the product to premium brand standards."
            </Text>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "100%"
        }}>
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src="https://f004.backblazeb2.com/file/xiangyi-assets/PM.jpg"
              alt="PM"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
            />
            <div style={{ position: "absolute", right: 12, bottom: 12, pointerEvents: "none" }}>
              <Badge style={{ borderRadius: "9999px", backgroundColor: "#7C3AED", color: "#FFFFFF", border: "none", fontWeight: 500, padding: "0 8px", height: "24px", display: "flex", alignItems: "center" }}>
                PM
              </Badge>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src="https://f004.backblazeb2.com/file/xiangyi-assets/Design.jpg"
              alt="Design"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
            />
            <div style={{ position: "absolute", right: 12, bottom: 12, pointerEvents: "none" }}>
              <Badge style={{ borderRadius: "9999px", backgroundColor: "#2563EB", color: "#FFFFFF", border: "none", fontWeight: 500, padding: "0 8px", height: "24px", display: "flex", alignItems: "center" }}>
                Design
              </Badge>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src="https://f004.backblazeb2.com/file/xiangyi-assets/Enginner.jpg"
              alt="Engineer"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px" }}
            />
            <div style={{ position: "absolute", right: 12, bottom: 12, pointerEvents: "none" }}>
              <Badge style={{ borderRadius: "9999px", backgroundColor: "#000000", color: "#FFFFFF", border: "none", fontWeight: 500, padding: "0 8px", height: "24px", display: "flex", alignItems: "center" }}>
                Engineer
              </Badge>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "var(--color-border-default)" }} />
          <div style={{ flex: 1, height: "0.5px", backgroundColor: "var(--color-border-default)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Text span style={{ fontSize: "12px", textTransform: "none", color: "var(--color-text-muted)", lineHeight: 1.3 }}>
            The trick
          </Text>
          <Text h2 style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "28px",
            lineHeight: 1.1,
            margin: 0,
            color: "var(--color-text-primary)"
          }}>
            How TikTok.com drive growth
          </Text>
        </div>

        <style>{`
          .tiktokweb-table table {
            border-collapse: collapse;
            width: 100%;
            background-color: transparent;
          }
          .tiktokweb-table thead th {
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: left;
          }
          .tiktokweb-table th,
          .tiktokweb-table td {
            vertical-align: top;
            padding: 12px;
            border-bottom: 1px solid var(--color-border-default);
            font-size: 14px;
            color: var(--color-text-secondary);
          }
          .tiktokweb-table tbody td:first-child {
            font-weight: 600;
            color: var(--color-text-primary);
          }
          .tiktokweb-table tr:last-child td {
            border-bottom: none;
          }
        `}</style>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{
              position: "relative",
              boxSizing: "border-box",
              border: "1px solid var(--color-border-default)",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "var(--color-bg-page)",
              overflow: "hidden"
            }}>
              <div style={{ overflowX: "auto", width: "100%", margin: "-20px", padding: "20px" }}>
                <div style={{ minWidth: "1200px" }} className="tiktokweb-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Design Systems &amp; Foundational Experience</th>
                        <th>Core Web Framework Iterations</th>
                        <th>Web Innovative Features</th>
                        <th>Performance &amp; Recommendations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.category}</td>
                          <td>{Array.isArray(row.col1) ? renderList(row.col1) : row.col1}</td>
                          <td>{Array.isArray(row.col2) ? renderList(row.col2) : row.col2}</td>
                          <td>{Array.isArray(row.col3) ? renderList(row.col3) : row.col3}</td>
                          <td>{Array.isArray(row.col4) ? renderList(row.col4) : row.col4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100%",
                  pointerEvents: "none",
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--color-bg-page) 100%)",
                }}
              />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <Text span style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              *Core: DAU + Life Time (LT) + Playtime
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default TiktokWebContent;
