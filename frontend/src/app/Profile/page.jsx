"use client";

export default function TravelProfile() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            color: "#5c8d34",
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
          TRAVEL PROFILE
        </h1>

        {/* TRAVELER PROFILE SECTION */}
        <h3
          style={{
            background: "#e6f5e9",
            padding: "10px",
            border: "1px solid #c9e6cf",
            borderRadius: "5px",
            color: "#5c8d34",
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          TRAVELER’S PROFILE
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td style={tdLeft}>Full Name</td>
              <td style={tdRight}>Roshika Rai</td>
            </tr>
            <tr>
              <td style={tdLeft}>Date of Birth</td>
              <td style={tdRight}>Jan 15, 2002</td>
            </tr>
            <tr>
              <td style={tdLeft}>Sex</td>
              <td style={tdRight}>Female</td>
            </tr>
            <tr>
              <td style={tdLeft}>Nationality</td>
              <td style={tdRight}>Indian</td>
            </tr>
            <tr>
              <td style={tdLeft}>Occupation</td>
              <td style={tdRight}>Student / Web Developer Intern</td>
            </tr>
            <tr>
              <td style={tdLeft}>Passport No.</td>
              <td style={tdRight}>AB-1234567</td>
            </tr>
          </tbody>
        </table>

        {/* CONTACT INFORMATION */}
        <h3
          style={{
            background: "#e6f5e9",
            padding: "10px",
            border: "1px solid #c9e6cf",
            borderRadius: "5px",
            color: "#5c8d34",
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          CONTACT INFORMATION
        </h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>City</th>
              <th style={thStyle}>State</th>
              <th style={thStyle}>Zip Code</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdBox}>Delhi</td>
              <td style={tdBox}>DL</td>
              <td style={tdBox}>110001</td>
              <td style={tdBox}>+91 9876543210</td>
              <td style={tdBox}>roshika@example.com</td>
            </tr>
          </tbody>
        </table>

        {/* TRAVEL HISTORY */}
        <h3
          style={{
            background: "#e6f5e9",
            padding: "10px",
            border: "1px solid #c9e6cf",
            borderRadius: "5px",
            color: "#5c8d34",
            marginBottom: "10px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          TRAVEL HISTORY
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Destination</th>
              <th style={thStyle}>Date Visited</th>
              <th style={thStyle}>Duration</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Travel Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdBox}>Goa</td>
              <td style={tdBox}>25 Nov 2024</td>
              <td style={tdBox}>3 Days</td>
              <td style={tdBox}>Vacation</td>
              <td style={tdBox}>Solo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tdLeft = {
  padding: "10px",
  border: "1px solid #dcdcdc",
  background: "#f7f7f7",
  width: "40%",
  fontWeight: "600",
};

const tdRight = {
  padding: "10px",
  border: "1px solid #dcdcdc",
  width: "60%",
  background: "#fff",
};

const thStyle = {
  padding: "10px",
  border: "1px solid #dcdcdc",
  background: "#f7f7f7",
  fontSize: "14px",
  fontWeight: "600",
};

const tdBox = {
  padding: "10px",
  border: "1px solid #dcdcdc",
  textAlign: "center",
};